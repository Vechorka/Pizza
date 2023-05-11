import React, {createContext, useState} from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {
    Routes, Route,
} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Cart} from "./pages/Cart";
import {useDispatch, useSelector} from "react-redux";


export const AppContext = createContext({})

function App() {
    const filter = useSelector((state:any) => state.filter.value)
    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('')

    return (
        <div>
            <div className="wrapper">
                <AppContext.Provider value={{searchValue, setSearchValue}}>
                    <Header />
                    <div className={'content'}>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Routes>
                    </div>
                </AppContext.Provider>
            </div>
        </div>

    );
}

export default App;
