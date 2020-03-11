import React from 'react'
import style from './slider.scss'
import { reportItemClick  } from '@report'
import { getPrice, modifySiteName } from '@commonMethods'
import placeholder from '@image/placeholder.png'
const Slider = React.forwardRef((props, ref) => {
    const { list, load } = props
    const handleClick = (item, index) => {
        reportItemClick()
        window.open(item.url, '_blank')
    }
    return (
        <div ref={ref} className={style['slider']}>
            {
                list.map((item, index) => {
                    return (
                        <div key={item.image_src} className={style['slider-item']} onClick={() => { handleClick(item, index) }}>
                            <img src={load ? item.image_src : placeholder} className={style['slider-item-img']}></img>
                            <div className={style['slider-item-title1']}>{modifySiteName(item.site)}</div>
                            <div className={style['slider-item-title2']}>{'￥' + getPrice(item.price)}</div>
                        </div>
                    )
                })
            }
        </div>
    )
})
export default Slider