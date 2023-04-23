import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {Pizza} from "./components/Pizza/Pizza";
import {isUint32Array} from "util/types";

function App() {
    let [items, setItems] = useState<any[]>([])

    useEffect(()=>{
        fetch('https://64456982b80f57f581b98c4e.mockapi.io/items')
            .then(res => res.json())
            .then((arr)=>{
                setItems(arr)
            })

    },[])


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
                                items.map((obj)=> (<Pizza key={obj.id} title={obj.title} price={obj.price} image={obj.imageUrl}
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
