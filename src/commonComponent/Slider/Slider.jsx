import React from 'react'
import style from './slider.scss'
import report from '@report'
import { getPrice } from '@commonMethods'
import placeholder from '@image/placeholder.png'
import URI from 'urijs'
const Slider = React.forwardRef((props, ref) => {
    const { list, load } = props
    const handleClick = (item) => {
        report.reportItemClick()
        let urlO=URI(item.url)
        Object.keys(window.actionSnapECConfig.params).forEach(function(key){
            urlO.addSearch({[key]: window.actionSnapECConfig.params[key]})
        })
        window.open(urlO.toString(), '_blank')
    }
    return (
        <div ref={ref} className={style['slider']}>
            {
                list.map((item) => {
                    return (
                        <div key={item.image_src} className={style['slider-item']} onClick={() => { handleClick(item) }}>
                            <img src={load ? item.image_src : placeholder} className={style['slider-item-img']}></img>
                            <div className={style['slider-item-title1']}>{item.brand}</div>
                            <div className={style['slider-item-title2']}>{'￥' + getPrice(item.price)}</div>
                        </div>
                    )
                })
            }
        </div>
    )
})
export default Slider