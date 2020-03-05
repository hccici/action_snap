/* eslint-disable */
import actionSnapGa from './ga.js'
import { logReport } from './discovery.js'
const gaId = window.actionSnapConfig.gaId
// 功能显示上报
const reportPageView = () => {
    logReport({
        type: 'snap_pageView'
    })
    actionSnapGa('event', 'page_view', {
        'send_to': gaId
    })
}
// 商品点击上报
const reportItemClick = (price) => {
    logReport({
        type: "snap_itemClick"
    })
    actionSnapGa('event', 'click_item', {
        'send_to': gaId
    })
}

// 广告位曝光上报
const reportItemIntersecting = (price) => {
    logReport({
        type: "snap_itemImp"
    })
    actionSnapGa('event', 'snap_itemImp', {
        'send_to': gaId
    })
}
export {
    reportPageView,
    reportItemClick,
    reportItemIntersecting
}