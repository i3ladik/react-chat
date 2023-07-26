import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';

import './navbar.css';
import logo from '../../assets/img/logo.svg';
import github from '../../assets/img/githubwhite.svg';
import avatar from '../../assets/img/avatar.svg';
import { logout } from '../../actions/auth.js';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const redirect = (link) => window.open(link, '_blank');

    return (
        <div className='navbar'>
            <div className='container'>
                <NavLink to='/'> <img src={logo} alt='logo' className='navbar_logo' /> </NavLink>
                <NavLink to='/'> <div className='navbar_header'>Chat</div> </NavLink>
                {!isAuth && <div className='navbar_loginout'><NavLink to='/login'>Sign In</NavLink></div>}
                {!isAuth && <div className='navbar_register'><NavLink to='/registration'>Sign Up</NavLink></div>}
                {isAuth && <div className='navbar_loginout' onClick={() => dispatch(logout())}>Sign Out</div>}
                {isAuth &&
                    <div className='navbar_avatar' style={{ backgroundImage: `url(${avatar})` }} onClick={() => redirect('https://gravatar.com/')} >
                        <img className='navbar_avatar' src={`https://www.gravatar.com/avatar/${md5(user.email)}`} alt='avatar' />
                    </div>
                }
                <img src={github} alt='github logo' className='navbar_github' onClick={() => redirect('https://github.com/i3ladik/react-chat')} />
            </div>
        </div >
    );
};

export default Navbar;