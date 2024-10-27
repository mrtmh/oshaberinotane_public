<template>
  <div>
    <div class="onRecode" v-if="mic.status == 'recording'">
      <div class="onRecode__modal">
        <p class="onRecode__modal-text">ろくおんちゅう</p>
        <button
          aria-label="録音を終了"
          class="onRecode__modal-btn"
          type="button"
          v-if="mic.status == 'recording'"
          @click="stopRecording"
        >
          おわり
        </button>
      </div>
    </div>
    <div class="voiceBox">
      <button
        aria-label="録音を開始"
        class="voiceBox__btn voiceBox__btn--green"
        type="button"
        v-if="mic.available"
        @click="startRecording"
      >
        ろくおん
      </button>
      <button
        aria-label="音声を開始"
        class="voiceBox__btn voiceBox__btn--pink"
        type="button"
        v-if="mic.available && mic.status == 'already'"
        @click="speakRecording"
      >
        さいせい
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VoiceBox",
  data() {
    return {
      /**
       * 録音機能オブジェクト
       * @type {Object}
       * status(String) : none,ready, recording, already 画面表示用操作状況
       * available(Boolean) : 録音機能の利用可否
       */
      mic: {
        status: "ready",
        available: false,
      },
      audioUrl: "", // 入力された音声データのURL
      recorder: null, // 音声にアクセスする "MediaRecorder" のインスタンス
      audioData: [], // 入力された音声データ
    };
  },
  methods: {
    /**
     * 録音を開始
     */
    startRecording() {
      this.mic.status = "recording";
      this.audioData = [];
      this.recorder.start();
    },
    /**
     * 録音データを再生
     */
    speakRecording() {
      if (this.audioUrl) {
        const music = new Audio(this.audioUrl);
        music.play().catch((error) => {
          this.$outputError("音声再生に失敗しました:", error);
        });
      } else {
        this.$outputWarn("再生する音声データがありません。");
      }
    },
    /**
     * 録音をストップ
     */
    stopRecording() {
      this.recorder.stop();
      this.mic.status = "already";
    },
    /**
     * マイクオブジェクトへアクセス
     */
    accessMic() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.recorder = new MediaRecorder(stream);
          this.recorder.addEventListener("dataavailable", (e) => {
            this.audioData.push(e.data);
          });
          this.recorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioData);
            this.audioUrl = URL.createObjectURL(audioBlob);
          });
          this.mic.status = "ready";
          this.mic.available = true;
        })
        .catch((err) => {
          /* エラーを処理 */
          this.mic.status = "none";
          this.mic.available = false;
        });
    },
  },
  mounted() {
    this.accessMic();
  },
};
</script>
<style lang="scss" scoped>
.voiceBox {
  position: absolute;
  top: 0;
  right: 0;

  &:before {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: #f9cb52;
    background-size: 436px auto;
    transform: rotate(180deg);
    transform-origin: center;
    z-index: -1;
    border-radius: 0 10px 0 0;
  }

  &__btn {
    margin: 10px;
    padding: 5px;
    border: 2px solid #ffffff;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

    &--green {
      background: #51ce3c;
    }

    &--pink {
      background: #f87deb;
    }
  }
}

.onRecode {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  &__modal {
    @include flex($flex-center);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    font-size: 30px;
    overflow: hidden;

    &-text {
      width: 100%;
      animation: leftToRightAnimation 1s linear infinite alternate;
      color: #fff;
      font-weight: bold;
    }

    &-btn {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 5px;
      height: 40px;
      border: #fff 2px solid;
      border-radius: 20px;
      background: aqua;
    }
  }
}
</style>
