<template>
  <div>
    <div v-for="(letters, lettersIndex) in lettersArray" :key="lettersIndex">
      <div
        v-for="(letter, index) in letters"
        :key="index"
        :style="letter.style"
        class="letter"
        :class="{ active: letter.isClicked }"
        @click="clickLetter(letter.char, lettersIndex, index)"
      >
        <div
          class="letterInner"
          @animationend="clickTextAnimationEnd(lettersIndex, index)"
        >
          {{ letter.char }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BgMoveTextTemplate",
  data() {
    return {
      lettersArray: [], // ワードをアニメーション処理できる形に整形した配列
      fontSize: {
        // ランダムにセットする文字サイズ
        max: 100,
        min: 50,
      },
      collectWords: [], // 選択した文字をプッシュした配列
      collectCheckWords: [], // 選択した言葉からチェックした文字を引いていった配列
      isCheckingWord: false, // 言葉のチェック中か確認するフラグ
    };
  },
  props: {
    arrayCharacter: { type: Array, required: true, default: () => [] }, // 設定したワードをバラバラの文字にセットした配列
  },
  computed: {
    ...mapState(["isUseSound"]),
    //　アニメーションするバラバラの文字配列
    validSequences() {
      const letterArray = this.arrayCharacter.map((data) => {
        return data.letter;
      });

      return letterArray.map((word) => {
        const chars = [];
        for (let i = 0; i < word.length; i++) {
          const char = word[i];

          // 小文字かどうかをチェック
          if (
            char === "ぁ" ||
            char === "ぃ" ||
            char === "ぅ" ||
            char === "ぇ" ||
            char === "ぉ" ||
            char === "ゃ" ||
            char === "ゅ" ||
            char === "ょ" ||
            char === "っ"
          ) {
            // 小文字の場合は、前の文字に追加
            chars[chars.length - 1] += char;
          } else {
            // 通常の文字の場合は新しい要素として追加
            chars.push(char);
          }
        }
        return chars;
      });
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初期設定
     */
    init() {
      this.lettersArray = this.initLettersArray();
      this.lettersArray.forEach((letters) => {
        letters.forEach((letter) => {
          this.setInitialPosition(letter);
          this.animate(letter);
        });
      });
    },
    /**
     * ワードをアニメーション処理できる形に整形した配列を生成
     */
    initLettersArray() {
      return this.validSequences.map((sequence) => {
        return sequence.map((char) => ({
          char: char,
          angle: Math.random() * 360,
          speed: 1,
          style: {},
          isClicked: false,
        }));
      });
    },
    /**
     * 文字クリックイベント
     * @param {String} letter クリックされた文字
     * @param {Int} lettersIndex lettersIndex
     * @param {Int} letterIndex letterIndex
     */
    clickLetter(letter, lettersIndex, letterIndex) {
      // クリックした要素にisClickedをtrueに設定
      this.lettersArray[lettersIndex][letterIndex].isClicked = true;
      this.$readAloud(letter);
      this.checkWords(letter);
    },
    /**
     * ワードを順番にクリックしているか評価する
     * @param {String} letter クリックされた文字
     */
    checkWords(letter) {
      //初期化
      const initSetting = () => {
        this.isCheckingWord = false;
        this.collectCheckWords = new Array();
        this.collectWords = new Array();
        this.$emit("checking", "");
      };

      // クリックしたものが一番目の文字か確認
      const chechCurrentIndex = this.validSequences.filter(
        (sequence) => sequence[0] === letter
      );

      //単語一文字目クリック時、これから確認するワードを保持
      const firstLetterSetting = () => {
        this.isCheckingWord = true;
        this.collectCheckWords = chechCurrentIndex[0].concat();
        this.collectWords = chechCurrentIndex[0].concat();
        this.collectCheckWords.shift();
        this.$emit("checking", this.collectWords.join(""));
      };

      //ワード選択確認中
      const checkingLetters = () => {
        this.collectCheckWords.shift();
      };

      // ワードを全て選択
      const collectLetters = () => {
        this.$outputLog("正解");
        this.$outputLog(this.collectWords.join(""));
        this.$emit("complete", this.collectWords.join(""));
      };

      if (!this.isCheckingWord && chechCurrentIndex.length >= 1) {
        if (chechCurrentIndex[0].length >= 1) {
          //単語一文字目クリック時、これから確認するワードを保持
          firstLetterSetting();
        } else {
          initSetting();
        }
      } else if (this.isCheckingWord && letter === this.collectCheckWords[0]) {
        this.$outputLog("確認中");
        checkingLetters();
        if (this.collectCheckWords.length < 1) {
          // ワードを全て選択
          collectLetters();
          initSetting();
        }
      } else {
        this.$outputLog("不正解");
        initSetting();
        // 別の単語の一文字目の場合、新規設定
        if (chechCurrentIndex.length >= 1 && chechCurrentIndex[0].length >= 1) {
          //単語一文字目クリック時、これから確認するワードを保持
          firstLetterSetting();
        }
      }
    },
    /**
     * テキストアニメーションポジション設定
     * @param {String} letter 文字
     */
    setInitialPosition(letter) {
      const size =
        Math.random() * (this.fontSize.max - this.fontSize.min) + 100; // 100~150のサイズ
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
      letter.style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${size}px`,
        transform: `rotate(${Math.random() * 360}deg)`, // ランダムな角度
        transition: "transform 0.1s linear infinite", // 変化のスムーズさ
      };
    },
    /**
     * テキストアニメーション設定
     * @param {String} letter 文字
     */
    animate(letter) {
      const move = () => {
        const radians = (letter.angle * Math.PI) / 180;
        const dx = Math.cos(radians) * letter.speed;
        const dy = Math.sin(radians) * letter.speed;

        const newX = parseFloat(letter.style.left) + dx;
        const newY = parseFloat(letter.style.top) + dy;

        // 画面の端で反射
        if (
          newX < 0 ||
          newX > window.innerWidth - parseFloat(letter.style.fontSize)
        ) {
          letter.angle = 180 - letter.angle; // 反射
        }
        if (
          newY < 0 ||
          newY > window.innerHeight - parseFloat(letter.style.fontSize)
        ) {
          letter.angle = -letter.angle; // 反射
        }

        letter.style.left = `${Math.min(
          Math.max(0, newX),
          window.innerWidth - parseFloat(letter.style.fontSize)
        )}px`;
        letter.style.top = `${Math.min(
          Math.max(0, newY),
          window.innerHeight - parseFloat(letter.style.fontSize)
        )}px`;

        // ゆっくりと回転
        letter.style.transform = `rotate(${
          (parseFloat(letter.style.transform.match(/-?\d+/)[0]) + 1) % 360
        }deg)`;

        requestAnimationFrame(move);
      };
      move();
    },
    /**
     * クリック時拡大アニメーション終了イベント
     * @param {Int} lettersIndex lettersIndex
     * @param {Int} letterIndex letterIndex
     */
    clickTextAnimationEnd(lettersIndex, letterIndex) {
      // クリックした要素にisClickedをfalseに設定
      this.lettersArray[lettersIndex][letterIndex].isClicked = false;
    },
  },
};
</script>

<style scoped>
.letter {
  font-weight: bold;
  user-select: none;
  letter-spacing: -20px;
  word-break: keep-all;
}
.letterInner {
  color: rgba(255, 255, 255, 0.4);
}
.letter.active .letterInner {
  animation: bounce 0.3s ease-in-out;
}
</style>
