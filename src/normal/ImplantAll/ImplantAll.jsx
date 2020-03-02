import React, { useState, useCallback } from 'react';
import Title from '@common/Title/Title.jsx'
import Tags from '@common/Tags/Tags.jsx'
import Slider from '@common/Slider/Slider.jsx'
function ImplantAll(props) {
  const name=window.actionSnapConfig.title
  const data = props.data
  //创建当前选择的state
  const [curSelect, setCurSelect] = useState(0)
  const handleTagSelect=useCallback(index=>{
    setCurSelect(index)
  },[])
  return (
    <div>
      <Title name={name}></Title>
      <Tags list={data} selectIndex={curSelect} onTagSelect={handleTagSelect}></Tags>
      <Slider list={data[curSelect].items}></Slider>
    </div>
  )
}
export default ImplantAll