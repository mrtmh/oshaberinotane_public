<template>
  <div class="container_inner">
    <DraweMenuTemplate color="orenge"></DraweMenuTemplate>
    <BackBtn link="/chiiku/garahina/" color="orenge"></BackBtn>
    <QuizBox :src="arrayWordImageList[intSelectQuizNumber].image"></QuizBox>

    <div id="drag" class="dragBox">
      <draggable
        tag="ul"
        :list="arrayQuizWord"
        group="people"
        class="dragBox__inner dragDropBox__inner"
        @start="onDragStart"
      >
        <li
          v-for="(qWordElement, index) in arrayQuizWord"
          :key="qWordElement.index"
          class="dragBox__inner-item dragDropBox__inner-item"
        >
          <span class="dragDropBox__inner-itemInner">{{
            qWordElement.name
          }}</span>
        </li>
      </draggable>
    </div>
    <ul id="drop" class="dropBox">
      <template
        v-for="(ansWord, arraySelfAnswerWordsIndex) in arraySelfAnswerWords"
      >
        <draggable
          tag="li"
          :list="ansWord"
          group="people"
          class="dropBox__inner dragDropBox__inner"
          @change="onDragEnd"
        >
          <span
            class="list-group-item dragDropBox__inner-item"
            v-for="(ansWordElement, ansWordIndex) in ansWord"
            :key="ansWordElement.index"
            :class="{
              'dropBox__inner-item--desable':
                arraySelfAnswerWordsIndex < intHintIndex,
            }"
          >
            <span class="dragDropBox__inner-itemInner">{{
              ansWordElement.name
            }}</span>
          </span>
        </draggable>
      </template>
    </ul>
    <div class="btnArea">
      <ActionBtn
        label="やりなおす"
        color="aqua"
        @click="initQuiz()"
      ></ActionBtn>
      <ActionBtn
        label="もんだいを<br />かえる"
        aria-label="もんだいをかえる"
        color="green"
        @click="reLoad()"
      ></ActionBtn>
      <ActionBtn label="ひんと" color="pink" @click="setHint()"></ActionBtn>
    </div>
    <CorrectAnswerModal
      :src="arrayWordImageList[intSelectQuizNumber].image"
      :stringOriginQesWord="stringOriginQesWord"
      v-if="isCorrectAnswerModal"
      @reLoad="reLoad()"
    ></CorrectAnswerModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";
import BackBtn from "@/components/button/BackBtn.vue";
import ToggleBtn from "@/components/button/ToggleBtn.vue";
import ActionBtn from "@/components/button/ActionBtn.vue";
import QuizBox from "@/components/chiiku/garahina/QuizBox.vue";
import CorrectAnswerModal from "@/components/chiiku/garahina/CorrectAnswerModal.vue";

export default {
  name: "garahina",
  components: {
    draggable: draggable,
    BackBtn: BackBtn,
    ToggleBtn: ToggleBtn,
    ActionBtn: ActionBtn,
    QuizBox: QuizBox,
    CorrectAnswerModal: CorrectAnswerModal,
  },
  data() {
    return {
      /**
       * クイズの言葉を音の順序に配列に格納　{no:0,name:"ぼ"},{no:1,name:"う"},{no:2,name:"し"}
       * @type {[{ no: Int, name: String }]}
       */
      arrayQuizWord: [],
      /**
       * ユーザ回答格納配列
       * @type {[{ no: Int, name: String }]}
       */
      arraySelfAnswerWords: [],
      /**
       * 選択中のクイズの言葉を音の順序に配列に格納　{no:0,name:"ぼ"},{no:1,name:"う"},{no:2,name:"し"}
       * @type {[{ no: Int, name: String }]}
       * * すももなどひらがなが重複する言葉にてひらがなを識別するため、no付きオブジェクトとして設定
       */
      arrayOriginQuizWord: [],
      intSelectQuizNumber: 0, // クイズ番号
      stringOriginQesWord: "", // 選択中のクイズのことば
      isCorrectAnswerModal: false, //正解モーダル表示の有無
      intHintIndex: 0, // 何文字目にヒントを出すかを数える変数
      // isUseSound: false, //音声機能のON/OFF
    };
  },
  computed: {
    ...mapState(["arrayWordImageList", "isUseSound"]),
  },
  methods: {
    ...mapActions(["updateUseSound"]),
    /**
     * store　isUseSoundの更新
     */
    changeisUseSound(isOn) {
      this.updateUseSound(isOn); // アクションを呼び出す
    },
    /**
     * クイズの問題をランダムに選択し、必要データをセット
     */
    setQes() {
      const selectRandomQuiz = () => {
        this.intSelectQuizNumber = Math.floor(
          Math.random() * this.arrayWordImageList.length
        );
        return this.arrayWordImageList[this.intSelectQuizNumber].name;
      };

      const shuffleWord = (word) => {
        const arrayAnswer = word.split("");
        const arrayShuffled = this.arrayShuffle(arrayAnswer);

        //　シャッフル済みのワードがオリジナルと同じ場合、再度シャッフルする
        if (word === arrayShuffled.join("")) {
          return shuffleWord(word);
        }

        return arrayShuffled;
      };

      const originalQuizWord = selectRandomQuiz();
      const shuffledQuizWord = shuffleWord(originalQuizWord);

      this.stringOriginQesWord = originalQuizWord;
      this.arrayQuizWord = shuffledQuizWord.map((value, index) => ({
        no: index,
        name: value,
      }));
      this.arrayOriginQuizWord = [...this.arrayQuizWord]; // Shallow copy

      // 自己解答用配列の生成
      this.arraySelfAnswerWords = originalQuizWord.split("").map(() => []);

      this.$readAloud(`${shuffledQuizWord.join("")}。。。。これ、なぁんだ？`);
    },
    /**
     * クイズのヒントをセット
     */
    setHint() {
      // 正解の単語からヒントの文字を抽出（「ひまわり」の2番目のひらがなは「ま」）
      const stringHintWord = this.stringOriginQesWord.charAt(this.intHintIndex);
      this.$readAloud(stringHintWord);

      // 問題の言葉の配列から、ヒントの言葉のオブジェクトを抽出
      let arrayHintWord = this.arrayQuizWord.filter(
        (word) => word.name === stringHintWord
      );

      // 問題欄 or 解答欄からヒントの文字を消す
      const deleteHintWordInList = () => {
        const checkHintInQuizWord = (array) => {
          return array.length > 0;
        };

        if (checkHintInQuizWord(arrayHintWord)) {
          // 問題にヒントの言葉あり
          // 問題のことばからヒントの文字を消す
          this.arrayQuizWord = this.arrayQuizWord.filter(
            (word) => word !== arrayHintWord[0]
          );
        } else {
          // 解答欄にヒントのことばあり
          // 解答欄から、ヒントの言葉を消す
          for (
            let index = 0;
            index < this.arraySelfAnswerWords.length;
            index++
          ) {
            // 解答欄の中にヒントのひらがなを発見
            arrayHintWord = this.arraySelfAnswerWords[index].filter(
              (word) => word.name === stringHintWord
            );

            if (arrayHintWord.length >= 1) {
              this.arraySelfAnswerWords[index] = this.arraySelfAnswerWords[
                index
              ].filter((word) => word !== arrayHintWord[0]);
              break;
            }
          }
        }
      };

      const moveHintCountWird = () => {
        const hintWords = this.arraySelfAnswerWords[this.intHintIndex];

        // ヒントの単語をクイズ単語に追加
        this.arrayQuizWord.push(...hintWords);

        // ヒントの単語をクリア
        hintWords.length = 0;
      };

      // arrayQuizWord(問題配列) or arraySelfAnswerWords(解答配列)にあるヒントワードを削除
      deleteHintWordInList(stringHintWord);

      // 解答欄のヒントを入れたいマスに、すでにひらがなが入っている場合、
      // 問題を選択する言葉へ、解答欄ヒントマスに入っていた言葉を移動する
      if (this.arraySelfAnswerWords[this.intHintIndex].length > 0) {
        moveHintCountWird();
      }

      // 解答欄のヒントを入れたいマスに、すでにひらがながからだった場合
      // ヒントを解答欄へ代入
      if (this.arraySelfAnswerWords[this.intHintIndex].length === 0) {
        this.arraySelfAnswerWords[this.intHintIndex].push(arrayHintWord[0]);
      }

      this.intHintIndex++;
      this.checkAns();
    },
    /**
     * 出題時の状態へ言葉を初期化
     */
    initQuiz() {
      this.arrayQuizWord = this.arrayOriginQuizWord.concat();
      this.intHintIndex = 0;
      this.arraySelfAnswerWords = this.arrayOriginQuizWord.map(
        (value, index) => {
          return [];
        }
      );
      this.isCorrectAnswerModal = false;
    },
    /**
     * 次の問題を作成
     */
    reLoad() {
      this.initQuiz();
      const oldWord = this.stringOriginQesWord;
      this.setQes();
      if (this.stringOriginQesWord === oldWord) {
        this.reLoad();
      }
    },
    /**
     * 配列をランダムに並び替え
     * * @param {Array} array 操作する配列
     * @return {Array} ランダムに並び替えた配列
     */
    arrayShuffle(array) {
      for (let i = array.length - 1; 0 < i; i--) {
        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array;
    },
    /**
     * 正解を確認
     */
    checkAns() {
      const self = this;

      const checkCompletedAnswer = () => {
        // 回答欄が全て埋まっているか確認
        return this.arraySelfAnswerWords.every(
          (wordArray) => wordArray.length > 0
        );
      };

      const checkCorrectAnswer = () => {
        // 回答内容が正しいか確認
        let ansIncliment = 0;
        for (const index in this.arraySelfAnswerWords) {
          if (
            this.arraySelfAnswerWords[index][0]["name"] ===
            self.arrayWordImageList[self.intSelectQuizNumber]["name"].substr(
              index,
              1
            )
          ) {
            ansIncliment++;
          }
        }
        return ansIncliment === this.arraySelfAnswerWords.length;
      };

      if (checkCompletedAnswer()) {
        // 解答欄読み上げ
        const text = this.arraySelfAnswerWords.map((obj) => obj[0].name);
        this.$readAloud(text);

        if (checkCorrectAnswer()) {
          // 正解の場合、正解モーダルを表示
          this.$outputLog("正解");
          this.$readAloud("正解です");
          this.isCorrectAnswerModal = true;
        } else {
          this.$outputLog("不正解");
          this.$readAloud("あれー");
        }
      }
    },
    /**
     * ドラッグスタート時、選択したひらがなを読み上げる
     * @param {Object} originalEvent イベントオブジェクト
     */
    onDragStart(originalEvent) {
      this.$readAloud(originalEvent.clone.innerText);
    },
    /**
     * ドラッグエンド時、文字の移動処理、答えのマスが全て埋まった場合、正解の確認
     */
    onDragEnd() {
      const self = this;

      // 答えのますに2文字ドロップされた場合、次のマスへ移動
      this.arraySelfAnswerWords.forEach((wordArray, index) => {
        if (wordArray.length >= 2) {
          const newWords = wordArray.slice(1); // 先頭以外の文字を取得
          this.arrayQuizWord.push(...newWords); // 配列をフラットにして追加
          this.arraySelfAnswerWords[index] = [wordArray[0]]; // 先頭を残して長さを1に
        }
      });

      // 全ての答えのマスが埋まっているか確認
      this.$nextTick(() => {
        const allFilled = this.arraySelfAnswerWords.every(
          (wordArray) => wordArray.length === 1
        );
        if (allFilled) {
          self.checkAns();
        }
      });
    },
  },
  created() {
    this.setQes();
  },
  beforeDestroy() {
    this.$cancelRead(); // 読み上げ途中の音声を破棄
  },
  head() {
    return {
      title: "がらひな",
      link: [
        { rel: "icon", type: "image/png", href: "/icon/garahinaicon.png" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icon/garahinaicon.png",
        },
      ],
      meta: [
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-capable", content: "yes" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.container_inner {
  @include bgBorderOrenge();
  overscroll-behavior-y: none;
  height: 100vh;
  min-height: 640px;
  padding: 50px 0px;
}
.dragDropBox__inner {
  list-style-type: none;
  &-item {
    @include flex($flex-center);
    cursor: pointer;
    background: #fff;
    box-sizing: border-box;
    flex-direction: column;
    padding: 0px;
    gap: 8px;
    width: 68px;
    height: 68px;
    background: #ffffff;
    border: 3px solid #de8601;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }
  &-itemInner {
    @include flex($flex-center);
    font-size: 28px;
    font-weight: 700;
    font-family: "Noto Sans JP", sans-serif;
    height: calc(70px - 6px);
  }
}
.dragBox__inner {
  @include flex($flex-center);
  margin-bottom: 20px;
  overflow: hidden;
  height: 70px;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 10px 0;
  box-sizing: content-box;
  &-item {
    margin: 0 3px;
  }
  &-item:not(.sortable-drag) {
    transition: transform 0.3s;
  }
  &-item:nth-child(4n) {
    transform: rotate(-6deg);
  }
  &-item:nth-child(4n + 1) {
    transform: rotate(3deg);
  }
  &-item:nth-child(4n + 2) {
    transform: rotate(-3deg);
  }
  &-item:nth-child(4n + 3) {
    transform: rotate(4deg);
  }
}
.dropBox {
  @include flex($flex-center);
  width: 100%;
  width: 100%;
  background: #fff;
  padding: 24px;
  &__inner {
    width: 70px;
    height: 70px;
    background: rgba(227, 57, 118, 0.05);
    border: 1px dashed #e634b4;
    &:not(:first-child) {
      border-left: none;
    }
    &-item--desable {
      pointer-events: none;
      border: none;
      box-shadow: none;
    }
  }
}
.btnArea {
  @include flex($flex-center);
  gap: 16px;
}
</style>
