import React, { useEffect, useRef, useState, useCallback } from 'react';
import Title from '@common/Title/Title.jsx'
import Tags from '@common/Tags/Tags.jsx'
import Slider from '@common/Slider/Slider.jsx'
import { isInView, debounce, throttle } from '@commonMethods'
import { reportItemIntersecting } from '@report'
function ImplantAll(props) {
  const name = window.actionSnapConfig.title
  const { data, index,className } = props
  //创建当前选择的state
  const [curSelect, setCurSelect] = useState(0)
  const handleTagSelect = useCallback(index => {
    setCurSelect(index)
  }, [])
  //懒加载、广告位上报
  const [load, setLoad] = useState(false)
  const sliderRef = useRef(null)
  useEffect(function () {
    if (isInView(sliderRef.current)) {
      setLoad(true)
      reportItemIntersecting()
    } else {
      const doS = debounce(function () {
        if (isInView(sliderRef.current)) {
          setLoad(true)
          reportItemIntersecting()
          window.removeEventListener('scroll', doS)
        }
      }, 300)
      window.addEventListener('scroll', doS)
    }
  }, [])
  return (
    <div className={className||''} id={`action_snap_box_${index}`}>
      <Title name={name}></Title>
      <Tags list={data} selectIndex={curSelect} onTagSelect={handleTagSelect}></Tags>
      <Slider ref={sliderRef} list={data[curSelect].items} load={load}></Slider>
    </div>
  )
}
export default ImplantAll