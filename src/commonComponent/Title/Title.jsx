import React from 'react';
import style from './title.scss'
function Title(props) {
    const goUrl=()=>{
        window.open('https://www.popin.cc/action/privacy.html', '_blank')
    }
    return (
        <div className={style['title']}>{props.name}
            <div onClick={goUrl} className={style['title-logo']}>
                <div className={style['title-logo-click']}></div>
            </div>
        </div>
    )
}
export default Title