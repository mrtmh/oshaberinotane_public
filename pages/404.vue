<template>
  <div>
    <h1>
      <span class="pink">4</span><span class="yellow">0</span
      ><span class="green">4</span>
    </h1>
    <p>お探しのページが見つかりませんでした。</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  layout: "siteLayout",
  data() {
    return {};
  },
  created() {},
  head() {
    return {
      title: "404",
    };
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 100px;
}
</style>
