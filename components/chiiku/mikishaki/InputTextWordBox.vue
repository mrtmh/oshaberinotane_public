<template>
  <div class="inputTextWordBox">
    <div class="inputTextWordBox__inner">
      <p class="inputTextWordBox__inner-text">{{ stringInputTextWord }}</p>
    </div>
    <div class="inputTextWordBox__btnList">
      <button
        v-if="isUseSound"
        aria-label="聞く"
        class="inputTextWordBox__btnList-btn inputTextWordBox__btnList-btn--yellow"
        @click="speakText()"
      >
        きく
      </button>
      <button
        aria-label="1文字消す"
        class="inputTextWordBox__btnList-btn inputTextWordBox__btnList-btn--glay"
        @click="setDeleteOneText()"
      >
        1もじけす
      </button>
      <button
        aria-label="全文字消す"
        class="inputTextWordBox__btnList-btn inputTextWordBox__btnList-btn--glay"
        @click="setDeleteAllText()"
      >
        ぜんぶけす
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InputTextWordBox",
  data() {
    return {};
  },
  props: {
    stringInputTextWord: { type: String, required: true, default: "" },
  },
  computed: {
    ...mapState(["isUseSound"]),
  },
  methods: {
    /**
     * テキストを読上
     * @param {string} text 読み上げるテキスト
     */
    speakText() {
      this.$emit("speak-text", this.stringInputTextWord);
    },
    setDeleteOneText() {
      const newWords = this.stringInputTextWord.slice(0, -1);
      this.$emit("update", newWords);
    },
    setDeleteAllText() {
      this.$emit("update", "");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.button {
  padding: 5px;
  height: 40px;
  border-radius: 20px;
  border: #fff 2px solid;
}
.inputTextWordBox {
  @include flex($flex-center);
  height: 20%;
  width: 100%;
  flex-direction: column;

  &__inner {
    display: flex;
    margin: 70px 20px 0;

    &-text {
      @include flex($flex-center);
      height: fit-content;
      min-width: 50px;
      max-width: 100%;
      min-height: 40px;
      background: #fff;
      font-size: 30px;
      padding: 0.2em 0.5em;
      color: #565656;
      border: dashed 2px #ffc3c3;
      border-radius: 3px;
    }

    &-btn {
      @extend .button;
      margin-left: 10px;
    }
  }

  &__btnList {
    margin: 20px 0;

    &-btn {
      @extend .button;
      display: block;
      float: left;

      &:not(:first-child) {
        margin-left: 10px;
      }

      &--yellow {
        background: rgb(255, 255, 0);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        border-radius: 12px;
      }
    }
  }
}
</style>
