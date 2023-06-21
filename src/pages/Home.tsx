import React, { useEffect, useRef} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {Categories} from "../components/Pizza/Categories/Categories";
import {Sort, sortList} from "../components/Pizza/Sort/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import {Pizza} from "../components/Pizza/Pizza";
import {Pagination} from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import qs from 'qs'
import {fetchPizzasTC} from "../redux/slices/pizzaSlice";


export const Home = () => {
    const {categoryId, sort, currentPage , searchValue} = useSelector((state:any) => state.filter)
    const {items, status} = useSelector((state:any) => state.pizza)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (page:number) => {
        dispatch(setCurrentPage(page))
    }

    const fetchPizzas = () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

            // @ts-ignore
        dispatch(fetchPizzasTC({
                sortBy,
                order,
                category,
                search,
                currentPage,
            }))


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

    const pizzas = items.map((obj: any) => (<Link key={obj.id} to={`pizza/${obj.id}`}>
            <Pizza {...obj}/>
        </Link>
            ))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className='container'>
            <div className={'content__top'}>
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className='content__title'>All pizzas</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Some error occurred :(</h2>
                    <p>Unfortunately pizzas do not get. Please try it later</p>
                </div>
            ):
                (<div className='content__items'>
            {status === 'loading'
                ? skeletons
                : pizzas
            }
                </div>
                )
            }
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>

    )
}