import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';

import './navbar.css';
import Logo from '../../assets/img/logo.svg';
import avatar from '../../assets/img/avatar.svg';
import { logout, test } from '../../actions/auth.js';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    return (
        <div className='navbar'>
            <div className='container'>
                <NavLink to='/'><img src={Logo} alt='logo' className='navbar_logo' /></NavLink>
                <div className='navbar_header'><NavLink to='/'>Chat</NavLink></div>
                {!isAuth && <div className='navbar_login'><NavLink to='/login'>Sign In</NavLink></div>}
                {!isAuth && <div className='navbar_register'><NavLink to='/registration'>Sign Up</NavLink></div>}
                {isAuth && <div className='navbar_login' onClick={() => dispatch(logout())}>Sign Out</div>}
                {
                    isAuth &&
                    <div className='navbar_avatar' style={{ backgroundImage: `url(${avatar})` }} onClick={() => test()} >
                        <img className='navbar_avatar' src={`https://www.gravatar.com/avatar/${md5(user.email)}`} alt='avatar' />
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;