<template>
  <div class="termsLayout">
    <div class="termsArea">
      <div class="termsArea-inner">
        <nuxt />
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter.vue";
export default {
  name: "termsLayout",
  components: {
    CommonFooter: CommonFooter,
  },
};
</script>
<style lang="scss" scoped>
.termsArea {
  @include bgBorderOrengeLight();
  @include flex($flex-center);
  padding: 40px 0 40px 0;
}
.termsArea-inner {
  @include borderBoxStyle();
  width: 80%;
}
</style>
