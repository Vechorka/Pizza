import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import styles from './Search.module.scss'

// @ts-ignore
import debounce from 'lodash.debounce'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../../redux/slices/filterSlice";


export const Search = () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setInputValue('')
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str:string) => {
            dispatch(setSearchValue(str))
        }, 400),
        []
    )

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <input ref={inputRef} value={inputValue} onChange={onChangeInput} className={styles.input} placeholder='Pizzas search...' />
            {!inputValue && <svg className={styles.icon} enableBackground="new 0 0 32 32" id="EditableLine" version="1.1"
                 viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round"
                        strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></circle>
                <line fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                      strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"></line>
            </svg>
            }
            {inputValue && <img onClick={onClickClear} className={styles.clearIcon} width="38"
                                 src="assets/img/x-circle-svgrepo-com.svg"
                                 alt="x"/>
            }
        </div>
    )
}

