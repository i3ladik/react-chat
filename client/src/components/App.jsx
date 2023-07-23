import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './app.css';
import Navbar from './navbar/Navbar.jsx';
import Registration from './auth/Registration.jsx';
import Login from './auth/Login.jsx';
import Chat from './chat/Chat.jsx';
import { auth } from "../actions/auth.js";

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Chat />} />
                    {!isAuth && <Route path='/registration' element={<Registration />} />}
                    {!isAuth && <Route path='/login' element={<Login />} />}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
