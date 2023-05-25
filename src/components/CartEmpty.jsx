import React from 'react';
import cartEmptyImage from '../assets/img/empty-cart.png'
import {Link} from "react-router-dom";

function CartEmpty(props) {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Cart is empty <icon>😕</icon></h2>
                <p>
                    You probably haven't ordered pizza yet.<br/>
                    To order pizza, go to the home page.
                </p>
                <img src={cartEmptyImage} alt="Empty cart"/>
                <Link to="/" className="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </>
    );
}

export default CartEmpty;