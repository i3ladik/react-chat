import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import './navbar.css';
import Logo from '../../assets/img/logo.svg';
import { logout, test } from '../../actions/auth.js';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className='navbar'>
            <div className='container'>
                <NavLink to='/'><img src={Logo} alt='logo' className='navbar_logo' /></NavLink>
                <div className='navbar_header'><NavLink to='/'>Chat</NavLink></div>
                {!isAuth && <div className='navbar_login'><NavLink to='/login'>Sign In</NavLink></div>}
                {!isAuth && <div className='navbar_register'><NavLink to='/registration'>Sign Up</NavLink></div>}
                {isAuth && <div className='navbar_login' onClick={() => dispatch(logout())}>Sign Out</div>}
                {isAuth && <div className='navbar_test' onClick={() => test()}>Test</div>}
            </div>
        </div>
    );
};

export default Navbar;