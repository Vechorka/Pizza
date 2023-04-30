import React, {useState} from "react";

export const Categories = (props:any) => {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]


    return (
        <div className='categories'>
            <ul>
                {
                   categories.map((e,i) => (<li key={e} onClick={()=>{props.onClickCategory(i)}} className={props.value === i ? 'active': ''}>
                       {e}
                   </li>))
                }
            </ul>
        </div>
    )
}