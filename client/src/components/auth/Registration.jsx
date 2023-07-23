import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './registration.css';
import Input from '../../utils/input/Input.jsx';
import { registration } from '../../actions/auth.js';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isButDisbld, setisButDisbld] = useState(false);
    const navigate = useNavigate();

    const registrationHandle = async () => {
        setisButDisbld(true);
        const result = await registration(email, password, nickname);
        setisButDisbld(false);
        if(result) navigate('/');
    };

    return (
        <div className='registration'>
            <div className='registration_header'>Registration</div>
            <Input value={nickname} setValue={setNickname} type='text' placeholder='Nickname' />
            <Input value={email} setValue={setEmail} type='text' placeholder='Email' />
            <Input value={password} setValue={setPassword} type='password' placeholder='Password' />
            <button className='registration_btn' onClick={registrationHandle} disabled={isButDisbld}>Sign Up</button>
        </div>
    );
};

export default Registration;