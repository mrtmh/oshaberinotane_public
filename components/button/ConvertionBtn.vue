<template>
  <div class="btn-conversion-area">
    <nuxt-link :to="link" class="btn-conversion">{{ text }}</nuxt-link>
    <p v-if="isAttentionTxt" class="btn-attention">
      ゲームをすると、利用規約に同意したことになります。
    </p>
  </div>
</template>

<script>
export default {
  name: "ConvertionBtn",
  props: {
    text: { type: String, required: true, default: "" },
    link: { type: String, required: true, default: "" },
    isAttentionTxt: { type: Boolean, required: false, default: false },
  },
};
</script>
<style lang="scss" scoped>
.btn-conversion-area {
  @include flex($flex-center);
  flex-flow: column;
  max-width: 21em;
}
.btn-conversion {
  @include flex($flex-center);
  width: fit-content;
  flex-direction: row;
  padding: 20px 50px; //PC
  color: $orengebg-color;
  font-weight: 800;
  font-size: 20px;
  text-decoration: none;
  line-height: 1.3;
  background: #fff;
  border: 10px solid $orengebg-color;
  border-radius: 20px;
  @include respond-to(mobile) {
    padding: 10px 20px; //SP
  }
}
.btn-attention {
  margin-top: 8px;
  font-size: 8px;
  line-height: 1.3;
}
</style>
