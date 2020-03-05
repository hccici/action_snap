import React, { useEffect, useRef, useState } from 'react'
import style from './slider.scss'
import { reportItemClick } from '@report'
import { getPrice, isInView, debounce } from '@commonMethods'
import placeholder from './placeholder.png'
function Slider(props) {
    const { list, groupIndex } = props
    const handleClick = (item, index) => {
        reportItemClick()
        window.open(item.url, '_blank')
    }
    const [load, setLoad] = useState(false)
    const slider = useRef(null)
    useEffect(function () {
        if (isInView(slider.current)) {
            console.log('已经加载')
            setLoad(true)
        } else {
            console.log('添加监听')
            const doS = debounce(function () {
                console.log('执行查询')
                if (isInView(slider.current)) {
                    setLoad(true)
                    console.log('移除监听')
                    window.removeEventListener('scroll', doS)
                }
            }, 300)
            window.addEventListener('scroll', doS)
        }
    }, [])
    return (
        <div ref={slider} className={style['slider']}>
            {
                list.map((item, index) => {
                    return (
                        <div key={item.image_src} className={style['slider-item']} onClick={() => { handleClick(item, index) }}>
                            <img src={load ? item.image_src : placeholder} className={style['slider-item-img']}></img>
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