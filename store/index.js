export const state = () => ({
    isFirstTime: "", // 初回アクセス確認
    isUseSound: true, //サウンドON/OFF isReadAloud
    isUseMic: "speechSynthesis" in window, // マイクの可否 isUseSpeak
    arrayWordImageList: [], // 単語イラストJSON plugins preLoadにて取得
});
export const mutations = {
    SET_IS_FIRSE_TIME(state, answers) {
        state.isFirstTime = answers;
    },
    SET_USE_SOUND(state, answers) {
        state.isUseSound = answers;
    },
    SET_USE_MIC(state, answers) {
        state.isUseMic = answers;
    },
    SET_WORD_IMAGE_LIST(state, answers) {
        state.arrayWordImageList = answers;
    },
};
export const actions = {
    updateIsFirstTime({ commit }, newSetting) {
        //updateUseSpeak
        commit('SET_IS_FIRSE_TIME', newSetting);
    },
    updateUseMic({ commit }, newSetting) {
        //updateUseSpeak
        commit('SET_USE_MIC', newSetting);
    },
    updateUseSound({ commit }, newSetting) {
        //updateReadAloud
        commit('SET_USE_SOUND', newSetting);
    },
};
