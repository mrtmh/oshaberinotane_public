<template>
  <div class="fallTemplate">
    <BackBtn
      :onClickEvt="true"
      link="/chiiku/garahina/"
      color="orenge"
      @click="backMenu"
    ></BackBtn>
    <div class="fall">
      <template v-for="(data, index) in arrayFallImgData">
        <span
          class="fall-box"
          :class="{
            'fall-img--click': data.click,
          }"
          :style="{
            left: data.left + 'px',
          }"
        >
          <img
            alt=""
            width="120"
            height="auto"
            class="fall-img"
            :class="{
              'fall-img--animation': data.animation,
            }"
            :src="'/img/index/fall-img_0' + data.num + '.png'"
            :style="{
              'animation-delay': data.delay + 'ms',
            }"
            @click="
              clickFallImg();
              data.click = true;
            "
            @animationend="resetFallImgData(index)"
          />
        </span>
      </template>
    </div>
    <div class="fallCount">
      <p>
        <img
          src="/img/index/fall-img.png"
          alt="あめだま"
          width="100"
          height="auto"
        />
        <span class="fallCount-num"> {{ intFallImgClick }}</span
        >こ
      </p>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/button/BackBtn.vue";
export default {
  name: "FallTemplate",
  data() {
    return {
      intFallImgClick: 0,
      intImgNum: 3,
      arrayFallImgData: [],
    };
  },
  components: {
    BackBtn,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 画面幅によって、降るイラストの個数を決める
      const intImgNum = Math.ceil(window.innerWidth / 150);

      // イラストをランダムに配置
      this.arrayFallImgData = [...Array(intImgNum)].map(function () {
        const left = Math.floor(Math.random() * (window.innerWidth - 200));
        const delay = Math.floor(Math.random() * 2000);
        const num = Math.ceil(Math.random() * 3);
        return {
          left: left,
          delay: delay,
          num: num,
          animation: true,
          click: false,
        };
      });
    },
    /**
     * イラスト降ってくる画像アニメーション終了時、降ってくるイラストのデータをリセット
     * @param {Int} index 画像データリストarrayFallImgDataの該当要素番号
     */
    resetFallImgData(index) {
      // アニメーション初期化
      this.arrayFallImgData.splice(index, 1, {
        left: 0,
        delay: 0,
        num: 1,
        animation: false,
        click: false,
      });
      // アニメーション初期化後、スレッドを分ける必要があるため、setTimeoutにて対応
      setTimeout(() => {
        const left = Math.floor(Math.random() * (window.innerWidth - 200));
        const delay = Math.floor(Math.random() * 2000);
        const num = Math.ceil(Math.random() * 3);
        const obj = {
          left: left,
          delay: delay,
          num: num,
          animation: true,
          click: false,
        };
        this.arrayFallImgData.splice(index, 1, obj);
      }, "1");
    },
    /**
     * 降ってくるイラストのクリック回数をカウント
     */
    clickFallImg() {
      this.intFallImgClick++;
    },
    backMenu() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.fall {
  position: absolute;
  top: -200px;
  height: calc(100vh + 200px);
  &-box {
    position: absolute;
  }
  &-img {
    padding: 25px;
    &--animation {
      animation: fallAnimation 10s ease-in-out;
    }
  }
}

.fall-img--click {
  animation: hiddenAnimation 0.5s ease-out forwards;
  overflow: hidden;
}

.fallCount {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
  &-num {
    font-size: 60px;
    color: rgb(173, 66, 254);
    text-shadow: #fff 0 0 5px, #fff 0 0 5px, #fff 0 0 5px;
  }
}
</style>
