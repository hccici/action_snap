import React,{useCallback} from 'react'
import style from './slider.scss'
import {reportItemClick} from '@report'
// import ImgWithLoading from '@common/ImgWithLoading/ImgWithLoading.jsx'
import {getPrice} from '@commonMethods'
function Slider(props) {
    const { list } = props
    const handleClick=(item)=>{
        reportItemClick()
        window.open(item.url, '_blank')
    }
    return (
        <div className={style['slider']}>
            {
                list.map((item) => {
                    return (
                        <div key={item.image_src} className={style['slider-item']} onClick={()=>{handleClick(item)}}>
                            {/* <ImgWithLoading src={item.image_src} className={style['slider-item-img']}></ImgWithLoading>  */}
                            <img src={item.image_src} className={style['slider-item-img']}></img>
                            <div className={style['slider-item-title1']}>{item.site}</div>
                            <div className={style['slider-item-title2']}>{getPrice(item.price)}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Slider