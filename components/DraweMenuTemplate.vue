<template>
  <div class="draweMenu">
    <div
      class="hamburger-menu"
      id="menuToggle"
      :class="[color, { 'hamburger-menu--active': isActive }]"
      @click="changeToggleMenu"
    >
      <div class="hamburger-menu-line"></div>
      <div class="hamburger-menu-line"></div>
      <div class="hamburger-menu-line"></div>
    </div>
    <div class="overlay" v-if="isActive" @click="closeMenu"></div>
    <div :class="['draweMenu', { 'is-active': isActive }]">
      <h2>メニュー</h2>
      <NavigationMenu></NavigationMenu>
      <!-- <div class="setting">
        <h2>せってい</h2>
        <SettingMenu></SettingMenu>
      </div> -->
    </div>
  </div>
</template>

<script>
// import SettingMenu from "@/components/SettingMenu.vue";

export default {
  name: "DraweMenuTemplate",
  components: {
    // SettingMenu: SettingMenu,
  },
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    color: { type: String, required: false, default: "white" },
  },
  computed: {},
  methods: {
    /**
     * トグルメニューの開閉を切替
     */
    changeToggleMenu() {
      this.isActive = !this.isActive;
    },
    /**
     * トグルメニューを閉じる
     */
    closeMenu() {
      this.isActive = false;
    },
  },
};
</script>
<style lang="scss" scoped>
$line-color: #fff;
$line-color-active: #666;
.hamburger-menu {
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: $hamburger-menu-hight;
  cursor: pointer;
  z-index: 1000;
  &-line {
    height: 4px;
    transition: all 0.3s ease;
    .white & {
      @extend .extendWhiteBtn;
    }
    .orenge & {
      @extend .extendOrengeBtn;
    }
  }
  // アクティブ状態（例: メニューが開いている時）
  &--active {
    .hamburger-menu-line {
      background-color: $line-color-active;
    }
    .hamburger-menu-line:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    .hamburger-menu-line:nth-child(2) {
      opacity: 0; // 中央の線を隠す
    }
    .hamburger-menu-line:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  }
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
    }
    &-txt {
      text-align: center;
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明のオーバーレイ */
  z-index: 1; /* オーバーレイをメニューの後ろに */
}
.draweMenu {
  position: fixed;
  top: 0;
  right: -250px; /* 初期位置は画面の外 */
  z-index: 1;
  width: 250px;
  height: 100%;
  background-color: #fff;
  transition: right 0.3s ease; /* アニメーション */
  padding: 20px;
}

.draweMenu.is-active {
  right: 0; /* アクティブ時は画面内に表示 */
}
</style>
