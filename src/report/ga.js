/* eslint-disable */
export default (function insertGaScript() {
    console.log('gtag import')
    const id = window.actionSnapConfig.gaId
    let actionSnapGa = null
    // 判断gtag是否存在，存在了就不用引入了
    if (!!!window.gtag) {
        var bodyEl = document.querySelector('body');
        var scriptEl = document.createElement("script");
        scriptEl.async = "async";
        scriptEl.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        bodyEl.appendChild(scriptEl)
        window.gDataLayer = window.gDataLayer || [];
        actionSnapGa = window.gtag = function () {
            window.gDataLayer.push(arguments);
        }
        window.gtag('js', new Date());
        window.gtag('config', id);
    }else{
        actionSnapGa = window.gtag
        // window.gtag('config', 'GA_MEASUREMENT_ID_2')
    }
    return actionSnapGa
})()