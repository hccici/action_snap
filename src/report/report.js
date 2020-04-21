/* eslint-disable */
import actionSnapGa from './analytics.js'
import { logReport } from './discovery.js'
import {getDevice} from '@commonMethods'

const device=getDevice()
const site=window.actionSnapECConfig.site
// 功能显示上报
const reportPageView = () => {
    logReport({
        type: 'pv'
    })
    actionSnapGa('send', {
        hitType: 'event',
        eventCategory: site,
        eventAction: 'pv',
        eventLabel: device
      })
}
// 商品点击上报
const reportItemClick = () => {
    logReport({
        type: "click"
    })
    actionSnapGa('send', {
        hitType: 'event',
        eventCategory: site,
        eventAction: 'click',
        eventLabel: device
      })
}

// 广告位曝光上报
const reportItemIntersecting = () => {
    logReport({
        type: "imp"
    })
    actionSnapGa('send', {
        hitType: 'event',
        eventCategory: site,
        eventAction: 'imp',
        eventLabel: device
      })
}
export default (function () {
    return {
        reportPageView,
        reportItemClick,
        reportItemIntersecting
    }
}())