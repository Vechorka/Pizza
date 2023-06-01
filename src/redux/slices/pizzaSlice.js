import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzasTC = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get(
            `https://64456982b80f57f581b98c4e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading',
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzasTC.pending]: (state) => {
            state.status = 'loading'
            state.items = []

        },
        [fetchPizzasTC.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzasTC.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },

    }

})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer