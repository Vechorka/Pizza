import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";

type PizzaTypeBlock = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: string[]
}

export const Pizza = ({id, title, price, imageUrl, sizes, types}: PizzaTypeBlock) => {
    const typeNames = ['thin', 'thick']

    const dispatch = useDispatch()
    const cartItem = useSelector((state: any)=> state.cart.items.find((obj:any)=>obj.id === id))
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    const addedCount = cartItem ? cartItem.count : ''

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize]
        }
        dispatch(addItem(item))
    }

  return (
      <div className='pizza-block'>
        <img className='pizza-block__image' src={imageUrl} alt="Pizza"/>
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
              {
                  types.map(e=><li key={e} onClick={()=>{ // @ts-ignore
                      setActiveType(e)}} className={activeType === e ? 'active' : ''}>{typeNames[e]}</li>)
              }
          </ul>
          <ul>
              {
                  sizes.map((e, i)=><li key={e} onClick={()=>{setActiveSize(i)}} className={activeSize === i ? 'active' : ''}>{e} cm.</li>)
              }
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>from {price} $</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
            <span>Add</span>
              {addedCount && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
  )
}