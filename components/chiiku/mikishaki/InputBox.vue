<template>
  <div class="inputBox">
    <ul v-for="gyou in arrayHiragana" class="inputBox__hiragana">
      <li
        v-for="moji in gyou"
        class="inputBox__hiragana-btn"
        @click="pushInputTextWord(moji)"
      >
        <span class="inputBox__hiragana-btnTxt">{{ moji }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "InputBox",
  data() {
    return {
      // ひらがなリスト
      arrayHiragana: [
        ["あ", "い", "う", "え", "お"],
        ["か", "き", "く", "け", "こ"],
        ["さ", "し", "す", "せ", "そ"],
        ["た", "ち", "つ", "て", "と"],
        ["な", "に", "ぬ", "ね", "の"],
        ["は", "ひ", "ふ", "へ", "ほ"],
        ["ま", "み", "む", "め", "も"],
        ["や", "ゆ", "よ"],
        ["ら", "り", "る", "れ", "ろ"],
        ["わ", "を", "ん"],
        ["が", "ぎ", "ぐ", "げ", "ご"],
        ["ざ", "じ", "ず", "ぜ", "ぞ"],
        ["だ", "ぢ", "づ", "で", "ど"],
        ["ば", "び", "ぶ", "べ", "ぼ"],
        ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
        ["きゃ", "きゅ", "きょ"],
        ["ぎゃ", "ぎゅ", "ぎょ"],
        ["しゃ", "しゅ", "しょ"],
        ["じゃ", "じゅ", "じょ"],
        ["ちゃ", "ちゅ", "ちょ"],
        ["ぢゃ", "ぢゅ", "ぢょ"],
        ["にゃ", "にゅ", "にょ"],
        ["ひゃ", "ひゅ", "ひょ"],
        ["びゃ", "びゅ", "びょ"],
        ["ぴゃ", "ぴゅ", "ぴょ"],
        ["みゃ", "みゅ", "みょ"],
        ["りゃ", "りゅ", "りょ"],
        ["ー", "っ"],
      ],
    };
  },
  methods: {
    /**
     * 入力された語を入力テキストに追加し読み上げ。
     * @param {string} txt 入力された文字
     */
    pushInputTextWord(txt) {
      this.$emit("push-btn", txt);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
// Input Box styles
.inputBox {
  @include bgBorderOrenge();
  overscroll-behavior-y: none;
  overflow: auto;
  height: 80%;
  width: 100%;
  border-top: 2px #000 dotted;

  &__hiragana {
    @include flex($flex-center);
    width: 100%;
    overflow: hidden;
  }

  &__hiragana-btn {
    @include flex($flex-center);
    box-sizing: border-box;
    cursor: pointer;
    flex-direction: column;
    padding: 0;
    width: 60px;
    height: 60px;
    background: #ffffff;
    border: 3px solid #de8601;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    margin: 5px;

    &:active {
      background: plum;
    }
  }

  &__hiragana-btnTxt {
    @include flex($flex-center);
    font-size: 26px;
    font-weight: 700;
    font-family: "Noto Sans JP", sans-serif;
    height: 64px;
  }
}
</style>
