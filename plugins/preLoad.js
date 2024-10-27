export default async function ({ $axios, store }) {
    const res = await $axios.$get("/chiiku/wordImageList.json");
    store.commit('SET_WORD_IMAGE_LIST', res.ans);
}