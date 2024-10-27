export default function ({ $axios, store, redirect }) {

    // baseURLを書き換えておく
    $axios.defaults.baseURL = window.location.origin

    // リクエストが送信される前に実行されるコールバック関数
    $axios.onRequest((config) => { })

    // レスポンスが返されたときに実行されるコールバック関数
    $axios.onResponse((response) => { })

    // エラーが発生したときに実行されるコールバック関数
    $axios.onError((error) => {
        const code = error.response ? error.response.status : null;
        if (code === 404) {
            redirect('/404');
        } else if (code === 500) {
            alert('サーバーエラーが発生しました');
        }
    })

    // タイムアウトの設定
    $axios.defaults.timeout = 10000; // 10秒
}