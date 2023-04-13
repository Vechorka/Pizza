import React from "react";

export const Pizza = () => {
  return (
      <div className='pizza-block'>
        <img src="" alt="Pizza"/>
        <h4 className='pizza-block__title'>Cheese</h4>
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
          <div className='pizza-block__price'>from 10$</div>
          <div className='button button--outline button--add'>
            <span>Add</span>
          </div>
        </div>
      </div>
  )
}