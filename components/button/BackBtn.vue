<template>
  <div>
    <template v-if="onClickEvt">
      <button
        class="backBtn"
        :class="color"
        aria-label="メニューへ戻る"
        @click="click()"
      >
        メニューへもどる
      </button>
    </template>
    <template v-else>
      <nuxt-link :to="link" class="backBtn" :class="color">{{
        text
      }}</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "BackBtn",
  props: {
    text: { type: String, required: false, default: "もどる" },
    link: { type: String, required: true, default: "" },
    color: { type: String, required: false, default: "white" },
    onClickEvt: { type: Boolean, required: false, default: false },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.backBtn {
  position: absolute;
  top: 0px;
  left: 0px;
  border: none;
  padding: 9px 15px;
  border-radius: 0 0 20px 0;
  text-decoration: none;
  &.white {
    @extend .extendWhiteBtn;
  }
  &.orenge {
    @extend .extendOrengeBtn;
  }
}
</style>
