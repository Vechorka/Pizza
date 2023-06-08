import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FullPizza(props) {
    let {id} = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState()

    useEffect(  ()=> {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://64456982b80f57f581b98c4e.mockapi.io/items/' + id)
                setPizza(data)
            }
            catch (e) {
                alert('Error')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza){
        return <p>Download...</p>;
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
        </div>
    );
}

export default FullPizza;