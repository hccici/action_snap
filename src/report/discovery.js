/* eslint-disable */
import URI from 'urijs'
// import { getDevice, getDate } from '@commonMethods'
export function logReport(params) {
    const {type}=params
    let url=URI(window.actionSnapECConfig.discoveryReportCbs[type]).setSearch({t: Date.now()}).toString()
    const image = new Image();
    image.src = url;
}