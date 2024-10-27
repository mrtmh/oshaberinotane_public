<template>
  <div>
    <BackBtn link="/"></BackBtn>
    <SiteMainVisual
      :catchphrase="catchphrase"
      :subText="subText"
      :arrayBgImgList="arrayBgImgList"
      :appImage="appImage"
      appName="mikishaki"
    />
    <PointTemplate :dataList="dataList" appName="mikishaki" />
    <CommonFooter />
  </div>
</template>

<script>
import BackBtn from "@/components/button/BackBtn.vue";
import SiteMainVisual from "@/components/site/SiteMainVisual.vue";
import PointTemplate from "@/components/site/PointTemplate.vue";
import CommonFooter from "@/components/CommonFooter.vue";

export default {
  name: "IndexPage",
  layout: "siteLayout",
  components: {
    BackBtn,
    SiteMainVisual,
    PointTemplate,
    CommonFooter,
  },
  data() {
    return {
      isDev: false,
      catchphrase:
        '<span class="pink">み</span>て、<span class="yellow">き</span>いて、<br class="only-sp" /><span class="green">しゃ</span>べって、<span class="orenge">き</span>いて、<br />はつおんマスター',
      subText:
        'ひらがなを聞いて喋って聞いて、<br class="only-sp"/>正しい発音を手に入れよう！',
      arrayBgImgList: [
        {
          src: "/img/chiiku/mikishaki/index/bg_mouth.png",
        },
        {
          src: "/img/chiiku/mikishaki/index/bg_eye.png",
        },
        {
          src: "/img/chiiku/mikishaki/index/bg_ear.png",
        },
      ],
      appImage: {
        src: "/img/chiiku/mikishaki/index/appImage.png",
      },
      dataList: [
        {
          title: "目・耳・口のトリプルアプローチ",
          text: "視覚・聴覚・発話を行うことで、言葉を総合的に学べます。多様な感覚を使うことで、より効果的に言葉を覚える手助けをします。",
          image: "/img/chiiku/mikishaki/index/point1.png",
          layout: "row",
        },
        {
          title: "実際の発音をチェック",
          text: "マイクを使って自分の声を録音し、自分の発音をチェックできるので、正しい発音を身につけるサポートをします。",
          image: "/img/chiiku/mikishaki/index/point2.png",
          layout: "row",
        },
        {
          title: "使いやすいインターフェース",
          text: "ちいさなお子様でも操作しやすいシンプルなデザインで、お子様ご自身が簡単に操作しやすいようになっています。",
          image: "/img/chiiku/mikishaki/index/point3.png",
          layout: "column",
        },
      ],
    };
  },
  created() {
    this.isDev = process.env.NODE_ENV === "development";
  },
  head() {
    return {
      title: "みきしゃき",
    };
  },
};
</script>
