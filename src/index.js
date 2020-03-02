/* eslint-disable */
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import ImplantAll from '@normal/ImplantAll/ImplantAll.jsx'
import {reportPageView} from '@report'
//获取react工作区域
var portList=document.querySelectorAll('.action_snap_entry')
//从window中取出数据
var actionSnapData={}
if(window.actionSnapData){
  window.actionSnapData.forEach(function(item){
    actionSnapData[item.link]=item.list
  })
}
//开始渲染
portList.forEach(function(item){
  var key=item.dataset.key
  var data=actionSnapData[key]
  if(data){
    ReactDOM.render(
      <ImplantAll data={data}></ImplantAll>,
      item
    );
  }
}) 
reportPageView()



