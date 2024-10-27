<template>
  <div>
    <BgMoveTextTemplate
      v-if="!isFall"
      :arrayCharacter="arrayCharacter"
      @checking="checkingText"
      @complete="changeImg"
    ></BgMoveTextTemplate>
    <DraweMenuTemplate></DraweMenuTemplate>
    <FallTemplate v-if="isFall" @click="backMenu"></FallTemplate>
    <div class="content">
      <div class="icon__list" :class="{ fadeOut: isFall }">
        <NavigationMenu :isVisibleLogo="true"></NavigationMenu>
        <div class="character" :class="{ fadeOut: isFall }">
          <span class="msgBox" @click="clickMsgBox()"></span>
          <template v-for="(data, index) in arrayCharacter">
            <span
              class="character-img"
              :class="[
                getCharacterImgClass(index, data),
                { active: data.isActive },
                { comp: data.isComplete },
              ]"
              @animationend="data.isComplete = false"
            ></span>
          </template>
        </div>
      </div>
    </div>

    <CommonFooter class="footer" />
  </div>
</template>

<script>
import BgMoveTextTemplate from "@/components/index/BgMoveTextTemplate.vue";
import DraweMenuTemplate from "@/components/DraweMenuTemplate.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";
import FallTemplate from "@/components/index/FallTemplate.vue";
import CommonFooter from "@/components/CommonFooter.vue";

export default {
  name: "IndexPage",
  layout: "siteIndexLayout",
  components: {
    BgMoveTextTemplate: BgMoveTextTemplate,
    CommonFooter: CommonFooter,
    NavigationMenu: NavigationMenu,
    DraweMenuTemplate: DraweMenuTemplate,
    FallTemplate: FallTemplate,
  },
  data() {
    return {
      isDev: false,
      isFall: false,
      arrayCharacter: [
        // ワード条件。頭文字が被らない。同じひらがなを違うワードで使わない。
        {
          img: "01",
          letter: "かぼちゃ",
          isComplete: false,
          isActive: false,
        },
        {
          img: "02",
          letter: "おばけ",
          isComplete: false,
          isActive: false,
        },
      ],
    };
  },

  methods: {
    /**
     * イラストキャラクター画像を設定するクラス名を生成
     * @param {Int} index arrayCharacter配列のindex
     * @param {Object} data arrayCharacter配列に格納されている選択されたオブジェクト
     */
    getCharacterImgClass(index, data) {
      const imgNumber = data.isComplete ? "2" : "1";
      this.$outputLog("character-img0" + index + "--0" + imgNumber);
      return "character-img0" + index + "--0" + imgNumber;
    },
    /**
     * イラストキャラクターワード選択中アニメーション
     * @param {String} txt
     */
    checkingText(txt) {
      this.arrayCharacter = this.arrayCharacter.map((character) => {
        if (character.letter === txt) {
          return { ...character, isActive: true };
        } else {
          return { ...character, isActive: false };
        }
      });
    },
    /**
     * イラストキャラクター画像の入替
     * @param {String} txt 画像変更するキャラクター名
     */
    changeImg(txt) {
      this.arrayCharacter = this.arrayCharacter.map((character) => {
        if (character.letter === txt) {
          return { ...character, isComplete: true };
        } else {
        }
        return character;
      });
    },
    /**
     * イラストメッセージボックスクリック
     */
    clickMsgBox() {
      this.isFall = true;
    },

    /**
     * メニューへ戻る
     */
    backMenu() {
      this.isFall = false;
    },
  },
  created() {
    this.isDev = process.env.NODE_ENV === "development";
  },
  mounted() {},
  head() {
    return {
      title: "ホーム",
    };
  },
};
</script>
<style lang="scss" scoped>
@charset "utf-8";
.content {
  @include flex($flex-center);
  height: 100vh;
}
.icon {
  &__list {
    @include flex($flex-center);
    @include borderBoxStyle();
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    flex-wrap: nowrap;
    gap: 30px;
    padding: 30px;
  }
}
.character {
  position: absolute;
  bottom: -50px;
  display: flex;
  width: calc(100% + 50px);
  justify-content: space-between;
  .msgBox {
    position: absolute;
    bottom: -30px;
    right: 0;
    content: "";
    width: 100px;
    height: 100px;
    background-image: url(/img/index/msgBox.png);
    background-repeat: no-repeat;
    background-size: 100px auto;
    animation: visibleLeftToRightAnimation 2s ease-in-out infinite alternate;
  }
  &-img {
    width: 100px;
    height: 100px;
    background-size: 100px auto;
    background-repeat: no-repeat;
    transform-origin: 50% 50%;
  }
  [class*="character-img00"] {
    animation: guraguraAnimation 1s ease-in-out infinite alternate;
    &.active {
      animation: jump 0.6s ease infinite;
    }
    &.comp {
      animation: rotate3D 0.5s linear 6 alternate;
    }
  }
  [class*="character-img01"] {
    animation: fuwafuwaAnimation 1s ease-in-out infinite alternate;
    &.active {
      animation: jump 0.6s ease infinite;
    }
    &.comp {
      animation: rotate3D 0.5s linear 6 alternate;
    }
  }

  &-img00--01 {
    background-image: url(/img/index/c-img02_01.png);
  }
  &-img00--02 {
    background-image: url(/img/index/c-img02_02.png);
  }
  &-img00--03 {
    background-image: url(/img/index/c-img02_03.png);
  }
  &-img01--01 {
    background-image: url(/img/index/c-img01_01.png);
  }
  &-img01--02 {
    background-image: url(/img/index/c-img01_02.png);
  }
  &-img01--03 {
    background-image: url(/img/index/c-img01_03.png);
  }
}

.fadeOut {
  pointer-events: none;
  animation: fadeOutAnimation 2s ease-out forwards;
}

.footer {
  background-color: #fff;
}
</style>
