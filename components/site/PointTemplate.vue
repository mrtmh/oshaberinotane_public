<template>
  <div class="point">
    <div class="point-contents">
      <div
        v-for="(data, index) in dataList"
        class="pointCel-area"
        :class="{ 'layout-column': data.layout === 'column' }"
      >
        <div class="point-txt-area">
          <h2 class="point-title">
            <span class="point-title-no">POINT.{{ index + 1 }}</span
            ><span class="point-title-text">{{ data.title }}</span>
          </h2>
          <p class="point-text">
            {{ data.text }}
          </p>
        </div>
        <div class="point-img-area">
          <img class="point-img" :src="data.image" alt="" />
        </div>
      </div>
    </div>
    <ButtonConvertion
      class="btn-convertion"
      text="今すぐあそぶ"
      :link="'/chiiku/' + appName + '/play'"
      :isAttentionTxt="false"
    />
  </div>
</template>

<script>
import ButtonConvertion from "/components/button/ConvertionBtn.vue";

export default {
  name: "PointTemplate",
  components: {
    ButtonConvertion,
  },
  props: {
    dataList: { type: Array, required: false, default: () => [] },
    appName: { type: String, required: true, default: "" },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.point {
  @include bgBorderOrengeLight();
  padding: 40px 15px;
}
.pointCel-area {
  @include borderBoxStyle();
  display: flex;
  flex-flow: row;
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 40px;
  &.layout-column {
    flex-flow: column;
  }
}
.point-title {
  margin-bottom: 10px;
  &-no {
    display: block;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    color: $orengebg-color;
  }
  &-text {
    font-size: 18px;
    font-weight: 400;
    line-height: 2;
    background: linear-gradient(transparent 60%, $orengebg-color 30%);
    display: inline;
    margin-bottom: 20px;
  }
}
.point-text {
  font-size: 12px;
}
.btn-convertion {
  margin: 0 auto;
}
.point-img {
  width: 100%;
  height: auto;
  margin: 20px auto 0 auto;
  @include respond-to(mobile) {
    width: 120px;
  }
}
// PC
@media ($breakpoint-mobile < width) {
  .point-contents {
    gap: 40px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1024px;
    margin: 0 auto;
  }
  .pointCel-area {
    flex-flow: column;
  }
}
</style>
