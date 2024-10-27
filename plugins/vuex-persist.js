import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
    new VuexPersistence({
        storage: window.localStorage,
        reducer: (state) => ({
            isUseSound: state.isUseSound,
            isUseMic: state.isUseMic,
            isFirstTime: state.isFirstTime
        }),
        filter: (mutation) =>
            mutation.type === 'SET_USE_SOUND' ||
            mutation.type === 'SET_USE_MIC' ||
            mutation.type === 'SET_IS_FIRSE_TIME',
    }).plugin(store)
}