import React, { useState,useEffect } from 'react'
import loading from './loading.png'
function ImgWithLoading(props) {
    const {
        src,
        className
    }=props
    const [status,setStatus]=useState(false)
    useEffect(()=>{
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setStatus(true)
        }
    },[])
    if (status) {
        return <img src={src} className={className} />
    } else {
        return <img src={loading} className={className} />
    }
}
export default ImgWithLoading