import React, {useEffect, useState} from "react";
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import {Pizza} from "../components/Pizza/Pizza";

export const Home = () => {
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
        <>
            <div className={'content__top'}>
                <Categories/>
                <Sort/>
            </div>
            <h2 className='content__title'>All pizzas</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => (
                        <Pizza key={obj.id} title={obj.title} price={obj.price} image={obj.imageUrl}
                               sizes={obj.sizes} types={obj.types}/>

                    ))
                }
            </div>
        </>

    )
}