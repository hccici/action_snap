/* eslint-disable */
export default (function insertGaScript() {
    console.log('ga add')
    var bodyEl = document.querySelector('body');
    var scriptEl = document.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.src = "https://www.googletagmanager.com/gtag/js?id=UA-158934202-3&l=gDataLayer";
    bodyEl.appendChild(scriptEl)
    window.gDataLayer = window.gDataLayer || [];
    function actionSnapGa() { window.gDataLayer.push(arguments); }
    // window.actionSnapGa = actionSnapGa;
    actionSnapGa('js', new Date());
    actionSnapGa('config', 'UA-158934202-3');
    return actionSnapGa
})()