<template>
  <div class="mikishaki">
    <BackBtn link="/chiiku/mikishaki/"></BackBtn>
    <DraweMenuTemplate></DraweMenuTemplate>
    <div class="main">
      <InputTextWordBox
        :string-input-text-word="stringInputTextWord"
        @speak-text="speakText"
        @update="updateStringInputTextWord"
      ></InputTextWordBox>
      <VoiceBox></VoiceBox>
      <InputBox @push-btn="pushInputBtn"></InputBox>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BackBtn from "@/components/button/BackBtn.vue";
import VoiceBox from "@/components/chiiku/mikishaki/VoiceBox.vue";
import InputBox from "@/components/chiiku/mikishaki/InputBox.vue";
import InputTextWordBox from "@/components/chiiku/mikishaki/InputTextWordBox.vue";

export default {
  name: "mikishaki",
  components: {
    BackBtn: BackBtn,
    VoiceBox: VoiceBox,
    InputTextWordBox: InputTextWordBox,
    InputBox: InputBox,
  },
  data() {
    return {
      stringInputTextWord: "", // 入力した文字列
    };
  },
  computed: {
    ...mapState(["isUseMic"]),
  },
  methods: {
    /**
     * 入力された語アップデートし読上
     * @param {string} word アップデートするテキスト
     */
    pushInputBtn(word) {
      this.updateStringInputTextWord(this.stringInputTextWord + word);
      this.$readAloud(word);
    },
    /**
     * 入力された語をアップデート
     * @param {string} newText アップデートするテキスト
     */
    updateStringInputTextWord(newText) {
      this.stringInputTextWord = newText;
    },
    /**
     * テキストを読上
     * @param {string} speakText 読み上げるテキスト
     */
    speakText(speakText) {
      this.$readAloud(speakText);
    },
  },
  mounted() {},
  beforeDestroy() {
    this.$cancelRead(); // 読み上げ途中の音声を破棄
  },
  head() {
    return {
      title: "みきしゃき",
      link: [
        { rel: "icon", type: "image/png", href: "/icon/mikishakiicon.png" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icon/mikishakiicon.png",
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
@charset "utf-8";

// Scrollbar styles
::-webkit-scrollbar {
  width: 30px;
}

::-webkit-scrollbar-track {
  background-color: #ccc;
}

::-webkit-scrollbar-thumb {
  background-color: #ff9114;
  border-radius: 15px;
}

// Body styles
body {
  @include bgBorderOrenge();
  overscroll-behavior-y: none;
}

// Main styles
.main {
  display: flex;
  flex-direction: column;
}
</style>
