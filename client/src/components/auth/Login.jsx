import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import './login.css';
import Input from '../../utils/input/Input.jsx';
import { login } from '../../actions/auth.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className='login'>
            <div className='login_header'>Sign In</div>
            <Input value={email} setValue={setEmail} type='text' placeholder='Email' />
            <Input value={password} setValue={setPassword} type='password' placeholder='Password' />
            <button className='login_btn' onClick={() => dispatch(login(email, password))}>Sign In</button>
        </div>
    );
};

export default Login;