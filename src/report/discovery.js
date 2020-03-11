/* eslint-disable */
import { getDevice, getDate } from '@commonMethods'
export function logReport(logParams) {
    const media = window.actionSnapConfig.mediaSite + '_snap_' + window.actionSnapConfig.ecSite
    const t = getDate()
    const type = getDevice() + '_' + logParams.type
    const url = 'https://rlog.popin.cc/s.gif?type=' + type + '&media=' + media + '&t=' + t+'&timestamp='+new Date().getTime();
    const image = new Image();
    image.src = url;
}