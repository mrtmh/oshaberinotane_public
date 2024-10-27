export default ({ app }) => {
    // ビューポートの高さをCSS変数で設定し、JavaScriptでその値を更新する（iPhone対策）
    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 初期設定
    setVh();

    // リサイズ時にも更新
    window.addEventListener('resize', setVh);
    window.addEventListener('visibilitychange', setVh);
    window.addEventListener('orientationchange', setVh);
    window.addEventListener('load', setVh);
};