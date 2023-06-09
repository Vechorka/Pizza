import React from 'react';
import './scss/app.scss';
import {Header} from "./components/Pizza/Header/Header";
import {
    Routes, Route,
} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Cart} from "./pages/Cart";
import FullPizza from "./components/Pizza/FullPizza";

function App() {

    return (
        <div>
            <div className="wrapper">
                    <Header />
                    <div className={'content'}>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='/pizza/:id' element={<FullPizza/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Routes>
                    </div>
            </div>
        </div>

    );
}

export default App;
