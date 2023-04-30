import React, {useEffect, useState} from "react";
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import {Pizza} from "../components/Pizza/Pizza";

export const Home = () => {
    const [items, setItems] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'rating',
        sortProperty: 'rating'
    })

    useEffect(()=>{
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        setIsLoading(true)
        fetch(
            `https://64456982b80f57f581b98c4e.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(res => res.json())
            .then((arr)=>{
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    },[categoryId, sortType])

    return (
        <div className='container'>
            <div className={'content__top'}>
                <Categories value={categoryId} onClickCategory={(i:number)=>{setCategoryId(i)}} />
                <Sort sortType={sortType} onChangeSort={(i:any)=>{setSortType(i)}} />
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
        </div>

    )
}