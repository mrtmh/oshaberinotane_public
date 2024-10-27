<template>
  <div class="settingMenu">
    <div class="icon__list">
      <template v-for="(data, index) in menuDataList">
        <ImgToggleBtn
          :isOn="getFlag(data.type)"
          :src="data.type"
          :label="data.label"
          @click="click(data.type)"
        ></ImgToggleBtn>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ImgToggleBtn from "@/components/button/ImgToggleBtn.vue";

export default {
  name: "SettingMenu",
  components: {
    ImgToggleBtn: ImgToggleBtn,
  },
  data() {
    return {
      menuDataList: [
        {
          type: "Mic",
          label: "マイクをつかう",
        },
        {
          type: "Sound",
          label: "おとをきく",
        },
      ],
    };
  },
  computed: {
    ...mapState(["isUseMic", "isUseSound"]),
  },
  methods: {
    ...mapActions(["updateUseSound", "updateUseMic"]),
    /**
     * On,Offの状態取得
     * @see /store/index.js
     * @param {string} type 機能タイプ Mic/Sound
     */
    getFlag(type) {
      let result = false;
      if (type === "Mic") {
        result = this.isUseMic;
      } else if (type === "Sound") {
        result = this.isUseSound;
      }
      return result;
    },
    /**
     * On,Offの状態切替
     * @see /store/index.js
     * @param {string} type 機能タイプ Mic/Sound
     */
    click(type) {
      if (type === "Mic") {
        // this.updateUseMic(!this.isUseMic);
      } else if (type === "Sound") {
        this.updateUseSound(!this.isUseSound);
      }
    },
    /**
     * メディアデバイスaudioへアクセス
     */
    accessMic() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.updateUseMic(true);
        })
        .catch((err) => {
          /* エラーを処理 */
          this.updateUseMic(false);
        });
    },
    /**
     * メディアデバイスaudioの状態を確認
     */
    checkMicAvailability() {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          let micAvailable = devices.some((device) => {
            return device.kind === "audioinput" && device.deviceId !== "";
          });
          this.updateUseMic(micAvailable);
        })
        .catch((err) => {
          this.$outputError(`${err.name}: ${err.message}`);
          this.micAvailable = false;
          this.updateUseMic(false);
        });
    },
  },
  mounted() {
    this.accessMic();
    this.checkMicAvailability();
    navigator.mediaDevices.addEventListener(
      "devicechange",
      this.checkMicAvailability
    );
  },
  beforeDestroy() {
    // コンポーネントが破棄される前にリスナーを削除
    navigator.mediaDevices.removeEventListener(
      "devicechange",
      this.checkMicAvailability
    );
  },
};
</script>
<style lang="scss" scoped>
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
