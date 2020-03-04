import React from 'react';
import style from './tags.scss'
function Tags(props) {
    const {
        list,
        selectIndex,
        onTagSelect
    }=props
    

    return (
        <div className={style['tags']}>
            {
                list.map(((item,index)=>{
                return <div key={item.category+index} onClick={()=>onTagSelect(index)} className={`${style['tags-item']} ${selectIndex==index?style['tags-item_selected']:''}`}>{item.category==='shoe'?'shoes':item.category}</div>
                }))
            }
        </div>
    )
}
export default Tags