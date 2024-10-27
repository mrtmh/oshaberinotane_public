<template>
  <div>
    <BackBtn link="/"></BackBtn>
    <SiteMainVisual
      :catchphrase="catchphrase"
      :subText="subText"
      :arrayBgImgList="arrayBgImgList"
      :appImage="appImage"
      appName="garahina"
    />
    <PointTemplate :dataList="dataList" appName="garahina" />
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
        '<span class="pink">てがる</span>に、<br class="only-sp" /><span class="yellow">たのしく</span>、<br />ことばマスター',
      subText: "ひらがなを並べ替えて、言葉を作ろう！",
      arrayBgImgList: [
        {
          src: "/img/chiiku/garahina/index/bg_ga.png",
        },
        {
          src: "/img/chiiku/garahina/index/bg_ra.png",
        },
        {
          src: "/img/chiiku/garahina/index/bg_hi.png",
        },
        {
          src: "/img/chiiku/garahina/index/bg_na.png",
        },
      ],
      appImage: {
        src: "/img/chiiku/garahina/index/appImage.png",
      },
      dataList: [
        {
          title: "飽きないゲーム性",
          text: "可愛いイラストがついたクイズ形式だから、ちいさなお子様でもゲーム感覚で楽しく自然に言葉に親しめます。",
          image: "/img/chiiku/garahina/index/point1.png",
          layout: "row",
        },
        {
          title: "200以上の言葉を収録",
          text: "数字、動物、食べ物などさまざまなテーマにて豊富な言葉が揃っています。語彙力がぐんぐん育てるサポートをします。",
          image: "/img/chiiku/garahina/index/point2.png",
          layout: "row",
        },
        {
          title: "直感操作で簡単に遊べる",
          text: "カードを指でマス目に持っていくだけなので、操作も簡単。サクサク進めることができるため飽きずに遊べます。",
          image: "/img/chiiku/garahina/index/point3.png",
          layout: "row",
        },
      ],
    };
  },
  created() {
    this.isDev = process.env.NODE_ENV === "development";
  },
  head() {
    return {
      title: "がらひな",
    };
  },
};
</script>
