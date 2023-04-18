import React, {useState} from "react";

export const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    const onClickCategory = (index:number) => {
        setActiveIndex(index)
    }

    return (
        <div className='categories'>
            <ul>
                {
                   categories.map((e,i) => (<li onClick={()=>{onClickCategory(i)}} className={activeIndex === i ? 'active': ''}>
                       {e}
                   </li>))
                }
            </ul>
        </div>
    )
}