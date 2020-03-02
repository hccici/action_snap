/* eslint-disable */
import actionSnapGa from './ga.js'
import { logReport } from './discovery.js'
// 功能显示上报
const reportPageView = () => {
    logReport({
        type: 'snap_pageview'
    })
    actionSnapGa('event', 'click_item', {
        'event_category': 'snap_click',
        'event_label': '点击商品',
        'value': '0'
    })
}
// 商品点击上报
const reportItemClick = (price) => {
    logReport({
        type: "snapItem_click"
    })
    actionSnapGa('event', 'click_item', {
        'event_category': 'snap_click',
        'event_label': '点击商品',
        'value': Number(price.split(' ')[0])
    })
}
export {
    reportPageView,
    reportItemClick
}