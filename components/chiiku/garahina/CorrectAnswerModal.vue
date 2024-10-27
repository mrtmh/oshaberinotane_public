<template>
  <div class="correctAnswerModal">
    <div class="correctAnswerModal__bgLayer"></div>
    <div class="correctAnswerModal__modal">
      <h2 class="correctAnswerModal__modal-title">せいかいです</h2>
      <img :src="src" alt="" height="150" />
      <p class="correctAnswerModal__modal-word">{{ stringOriginQesWord }}</p>
      <ActionBtn
        class="correctAnswerModal__modal-btn"
        label="つぎのもんだい"
        color="pink"
        @click="reLoad()"
      ></ActionBtn>
    </div>
  </div>
</template>

<script>
import ActionBtn from "@/components/button/ActionBtn.vue";

export default {
  name: "CorrectAnswerModal",
  data() {
    return {};
  },
  components: {
    ActionBtn: ActionBtn,
  },
  props: {
    src: { type: String, required: true, default: "" },
    stringOriginQesWord: { type: String, required: true, default: "" },
  },
  methods: {
    reLoad() {
      this.$emit("reLoad");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.correctAnswerModal__bgLayer {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 1;
}
.correctAnswerModal__modal {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  background: #fff;
  padding: 40px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
  width: 80%;
  box-sizing: border-box;
  &-title {
    font-size: 30px;
  }
  &-word {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  &-btn {
    margin: 0 auto;
  }
}
</style>
