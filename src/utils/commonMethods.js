/* eslint-disable */
const getPrice = function (source) {
    let price = (source && source.split(' ')[0]) || '';
    price = price.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/,$/, '').split('').reverse().join('');
    return price
}
export {
    getPrice
}