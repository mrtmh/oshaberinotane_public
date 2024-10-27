<template>
  <div class="mv">
    <template v-for="(data, index) in arrayBgImgList">
      <img
        alt=""
        width="94"
        height="auto"
        :src="data.src"
        :class="'bg-' + index"
      />
    </template>
    <div class="mv-txt">
      <h2 class="mv-title" v-html="catchphrase"></h2>
      <p v-html="subText"></p>
      <ButtonConvertion
        class="btn-convertion"
        text="今すぐあそぶ"
        :link="'/chiiku/' + appName + '/play'"
        :isAttentionTxt="false"
      />
    </div>
    <div class="mv-img">
      <img :src="appImage.src" width="150" height="auto" alt="" />
    </div>
  </div>
</template>

<script>
import ButtonConvertion from "@/components/button/ConvertionBtn.vue";

export default {
  name: "MainVisual",
  components: {
    ButtonConvertion,
  },
  props: {
    catchphrase: { type: String, required: true, default: "" },
    subText: { type: String, required: true, default: "" },
    arrayBgImgList: { type: Array, required: true, default: () => [] },
    appImage: { type: Object, required: true, default: () => ({}) },
    appName: { type: String, required: true, default: "" },
  },
  data() {
    return {};
  },
  created() {},
};
</script>
<style lang="scss" scoped>
// 背景画像
.bg-0 {
  position: absolute;
  top: 10px;
  left: calc(50% - 45%);
  z-index: -1;
  pointer-events: none;
}
.bg-1 {
  position: absolute;
  top: 110px;
  left: calc(50% - 5%);
  z-index: -1;
  pointer-events: none;
}
.bg-2 {
  position: absolute;
  top: 160px;
  left: calc(50% - 50%);
  z-index: -1;
  pointer-events: none;
}
.bg-3 {
  position: absolute;
  top: 280px;
  left: calc(50% - 0%);
  z-index: -1;
  pointer-events: none;
}

.mv {
  @include flex($flex-center);
  padding-top: 40px;
  max-width: 1024px;
  &-txt {
    padding-left: 15px;
    width: 80%;
    text-align: center;
  }
  &-title {
    margin-bottom: 8px;
  }
}
.mv-title,
.mv-title * {
  font-size: var(--title-level2-fontSize);
}
.btn-convertion {
  margin: 40px auto 0 auto;
}
</style>
