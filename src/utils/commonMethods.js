/* eslint-disable */
const getPrice = function (source) {
    let price = (source && source.split(' ')[0]) || '';
    price = price.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/,$/, '').split('').reverse().join('');
    return price
}
/* 节流 */
const throttle = function (fn, delay) {
    let last = 0
    delay=delay||1000
    return function () {
        let now = Date.now()
        if (now - last >= delay) {
            last = now
            fn.apply(this, arguments)
        }
    }
}
/* 防抖 */
const debounce = function (fn, delay) {
    let timer;
    delay=delay||1000
    return function () {
        let self = this, argumentsBySelf = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, argumentsBySelf);
        }, delay);
    }
}
/* 判断元素是否在可是区域内 */
const isInView = function (el) {
    let bound = el.getBoundingClientRect();
    var clientHeight = window.innerHeight;
    return bound.top <= clientHeight;
}
export {
    getPrice,
    throttle,
    debounce,
    isInView
}