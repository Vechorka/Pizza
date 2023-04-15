import React, {useState} from "react";

type PizzaPropsType = {
    title: string
    price: string
}

export const Pizza = ({title, price}:PizzaPropsType) => {
    const [pizzaCount, setPizzaCount] = useState(0)

    const onclickHandler = () => {
        setPizzaCount(pizzaCount + 1)
    }

  return (
      <div className='pizza-block'>
        <img src="" alt="Pizza"/>
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            <li className='active'>thin</li>
            <li>thick</li>
          </ul>
          <ul>
            <li className='active'>26 cm.</li>
            <li>30 cm.</li>
            <li>40 cm.</li>
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>from {price} $</div>
          <button onClick={onclickHandler} className='button button--outline button--add'>
            <span>Add</span>
              <i>{pizzaCount}</i>
          </button>
        </div>
      </div>
  )
}