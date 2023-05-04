import React, {useContext, useEffect, useState} from "react";
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import {Pizza} from "../components/Pizza/Pizza";
import {Pagination} from "../components/Pagination/Pagination";
import {AppContext} from "../App";

export const Home = () => {
    const {searchValue}:any = useContext(AppContext)

    const [items, setItems] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({
        name: 'rating',
        sortProperty: 'rating'
    })

    useEffect(() => {
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        setIsLoading(true)
        fetch(
            `https://64456982b80f57f581b98c4e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then(res => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((obj) => (
            <Pizza key={obj.id} title={obj.title} price={obj.price} image={obj.imageUrl}
                   sizes={obj.sizes} types={obj.types}/>))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className='container'>
            <div className={'content__top'}>
                <Categories value={categoryId} onClickCategory={(i: number) => {
                    setCategoryId(i)
                }}/>
                <Sort sortType={sortType} onChangeSort={(i: any) => {
                    setSortType(i)
                }}/>
            </div>
            <h2 className='content__title'>All pizzas</h2>
            <div className='content__items'>
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
            <Pagination onChangePage={(number:any) => setCurrentPage(number)}/>
        </div>

    )
}