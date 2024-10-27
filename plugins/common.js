export default ({ app, store }, inject) => {
    inject('outputLog', (message) => {
        if (process.env.NODE_ENV === "development") {
            console.log(`LOG: ${message}`)
        }
    })
    inject('outputError', (message) => {
        if (process.env.NODE_ENV === "development") {
            console.error(`ERROR: ${message}`)
        }
    })
    inject('outputTable', (message) => {
        if (process.env.NODE_ENV === "development") {
            console.table(message)
        }
    })
    inject('outputWarn', (message) => {
        if (process.env.NODE_ENV === "development") {
            console.warn(`${message}`)
        }
    })

    /**
     * 読み上げ関数
     * @param {string} txt 読上するテキスト
     */
    inject('readAloud', (txt) => {
        const isUseSound = store.state.isUseSound;

        if (isUseSound && "speechSynthesis" in window) {
            app.$cancelRead();
            const uttr = new SpeechSynthesisUtterance();
            // 音声を読み上げる人の指定
            var voice = speechSynthesis.getVoices().find(function (voice) {
                return voice.name === "Haruka";
            });

            uttr.voice = voice;
            if (voice) {
                uttr.voice = voice;
            }

            uttr.text = txt;
            uttr.lang = "ja-JP";
            uttr.rate = 0.8;
            uttr.pitch = 1;
            uttr.volume = 0.5;
            window.speechSynthesis.speak(uttr);
        }
    })
    /**
    * 読み上げキャンセル関数
    */
    inject('cancelRead', () => {
        const isUseSound = store.state.isUseSound;
        if (isUseSound && "speechSynthesis" in window) {
            speechSynthesis.cancel();
        }
    })
}