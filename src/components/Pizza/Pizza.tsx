import React, {useState} from "react";

type PizzaPropsType = {
    title: string
    price: number
    image: string
    sizes: number[]
    types: number[]
}

export const Pizza = (props:PizzaPropsType) => {
    const typeNames = ['thin', 'thick']

    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

  return (
      <div className='pizza-block'>
        <img className='pizza-block__image' src={props.image} alt="Pizza"/>
        <h4 className='pizza-block__title'>{props.title}</h4>
        <div className='pizza-block__selector'>
          <ul>
              {
                  props.types.map(e=><li onClick={()=>{setActiveType(e)}} className={activeType === e ? 'active' : ''}>{typeNames[e]}</li>)
              }
          </ul>
          <ul>
              {
                  props.sizes.map((e, i)=><li onClick={()=>{setActiveSize(i)}} className={activeSize === i ? 'active' : ''}>{e} cm.</li>)
              }
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>from {props.price} $</div>
          <button className='button button--outline button--add'>
            <span>Add</span>
              <i>0</i>
          </button>
        </div>
      </div>
  )
}