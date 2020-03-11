/* eslint-disable */
//引入全局配置，一定在在很前面
import './config.js'
import React from 'react'
import ReactDOM from 'react-dom'
import ImplantAll from '@normal/ImplantAll/ImplantAll.jsx'
import { reportPageView } from '@report'
//获取react工作区域
var portList = document.querySelectorAll('.action_snap_entry')
//从window中取出数据
var actionSnapData = {}
if (window.actionSnapData) {
  window.actionSnapData.forEach(function (item) {
    actionSnapData[item.link] = item.list
  })
}
portList.forEach(function (item, index) {
  var key = item.dataset.key
  var data = actionSnapData[key]
  if (data) {
    ReactDOM.render(
      <ImplantAll data={data} index={index}></ImplantAll>,
      item
    );
  }
})
reportPageView()
//报告版本号
console.log('mery_1.0')



