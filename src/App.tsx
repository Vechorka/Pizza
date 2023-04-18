import React from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {Pizza} from "./components/Pizza/Pizza";
import pizzas from './pizzas.json'



function App() {
    return (
        <div>
            <div className="wrapper">
                <Header />
                <div className={'content'}>
                    <div className={'container'}>
                        <div className={'content__top'}>
                            <Categories />
                            <Sort/>
                        </div>
                        <h2 className='content__title'>All pizzas</h2>
                        <div className='content__items'>
                            {
                                pizzas.map((obj)=> (<Pizza title={obj.title} price={obj.price} image={obj.imageUrl}
                                                           sizes={obj.sizes} types={obj.types}/>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
