<template>
  <div class="arrayQuizAnswerTable">
    <div
      v-for="(ansElement, index) in arrayWordImageList"
      class="arrayQuizAnswerTable__tr"
    >
      <h2 class="arrayQuizAnswerTable__tr-th">
        {{ ansElement.name }}<br />{{ ansElement.image }}
      </h2>
      <img :src="ansElement.image" alt="" height="150" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "garahina",
  data() {
    return {};
  },
  computed: {
    ...mapState(["arrayWordImageList"]),
  },
  mounted() {
    this.$outputTable(this.arrayWordImageList);
  },
  head() {
    return {
      title: "がらひな|デバック",
      link: [
        { rel: "icon", type: "image/png", href: "/icon/garahinaicon.png" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icon/garahinaicon.png",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.arrayQuizAnswerTable {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.arrayQuizAnswerTable__tr {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
}
.arrayQuizAnswerTable__tr-th {
  @include flex($flex-center);
  font-size: 10px;
  font-weight: normal;
}
</style>
