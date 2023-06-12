import React, {useState} from "react";

export const Categories = (props:any) => {

    const categories = [
        'All',
        'Meat',
        'Vegetarians',
        'Grille',
        'Spicy',
        'Closed'
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