<template>
  <div class="navigationMenu">
    <Logo v-if="isVisibleLogo" :isBgDark="false"></Logo>
    <div class="icon__list">
      <template v-for="(data, index) in menuDataList">
        <nuxt-link :to="data.link" class="icon__list-icon">
          <img
            :src="data.src"
            width="100"
            height="100"
            class="icon__list-img"
          />
          <p class="icon__list-txt">{{ data.label }}</p>
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default {
  name: "NavigationMenu",
  components: {
    Logo: Logo,
  },
  data() {
    return {
      menuDataList: [
        {
          link: "/chiiku/garahina/",
          src: "/icon/garahinaicon.png",
          label: "がらひな",
        },
        {
          link: "/chiiku/mikishaki/",
          src: "/icon/mikishakiicon.png",
          label: "みきしゃき",
        },
      ],
    };
  },
  props: {
    isVisibleLogo: { type: Boolean, required: false, default: false },
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.navigationMenu {
  @include flex($flex-center);
  flex-direction: column;
}
.icon {
  &__list {
    @include flex($flex-center);
    position: relative;
    flex-wrap: nowrap;
    gap: 30px;
    padding: 30px;
    border-radius: 30px;
    &-img {
      border-radius: 50%;
      border: #999 1px solid;
    }
    &-txt {
      text-align: center;
    }
  }
}
</style>
