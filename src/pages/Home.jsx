import React, {useContext, useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom'
import {Categories} from "../components/Pizza/Categories/Categories";
import {Sort, sortList} from "../components/Pizza/Sort/Sort";
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
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {searchValue} = useContext(AppContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        setIsLoading(true)

        try {
            const res = await axios.get(
                `https://64456982b80f57f581b98c4e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            setItems(res.data)

        }
        catch (error){
            alert ('Error while getting pizzas')
        }
        finally {
            setIsLoading(false)
        }
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
            isSearch.current = true
        }
    },[])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current){
            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])

    useEffect(()=>{
        if (isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort, searchValue, currentPage])

    const pizzas = items.map((obj) => (
            <Pizza key={obj.id} {...obj}/>))
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