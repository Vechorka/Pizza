import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'
import {Categories} from "../components/Categories/Categories";
import {Sort, sortList} from "../components/Sort/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import {Pizza} from "../components/Pizza/Pizza";
import {Pagination} from "../components/Pagination/Pagination";
import {AppContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs'


export const Home = () => {
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {searchValue} = useContext(AppContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    useEffect(()=>{
        if (window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort
                }
                )
            )
        }
    },[])

    useEffect(() => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        setIsLoading(true)

        axios
            .get(`https://64456982b80f57f581b98c4e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

    useEffect(()=>{
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        })

        navigate(`?${queryString}`)
    }, [categoryId, sort, searchValue, currentPage])

    const pizzas = items.map((obj) => (
            <Pizza key={obj.id} title={obj.title} price={obj.price} image={obj.imageUrl}
                   sizes={obj.sizes} types={obj.types}/>))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className='container'>
            <div className={'content__top'}>
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className='content__title'>All pizzas</h2>
            <div className='content__items'>
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>

    )
}