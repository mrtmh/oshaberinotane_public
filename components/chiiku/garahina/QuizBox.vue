<template>
  <div class="quizBox">
    <h2 class="quizBox-title">これ、な〜んだ？</h2>
    <img class="quizBox-img" :src="src" alt="" height="150" />
  </div>
</template>

<script>
export default {
  name: "QuizBox",
  data() {
    return {};
  },
  components: {},
  props: {
    src: { type: String, required: true, default: "" },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.quizBox {
  background: #fff;
  width: fit-content;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 16px 24px 24px;
  background: #ffffff;
  border: 2px solid #c5a145;
  border-radius: 16px;
  margin-bottom: 32px;
  &-title {
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  &-img {
    display: block;
    margin: 0 auto;
  }
}
</style>
