import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {Pizza} from "./components/Pizza/Pizza";
import {isUint32Array} from "util/types";
import Skeleton from "./components/Pizza/Skeleton";

function App() {
    const [items, setItems] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch('https://64456982b80f57f581b98c4e.mockapi.io/items')
            .then(res => res.json())
            .then((arr)=>{
                setItems(arr)
                setIsLoading(false)
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
                            {isLoading
                                ? [...new Array(6)].map((_, index)=><Skeleton key={index}/>)
                                : items.map((obj)=> (
                                    <Pizza key={obj.id} title={obj.title} price={obj.price} image={obj.imageUrl}
                                                   sizes={obj.sizes} types={obj.types}/>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
