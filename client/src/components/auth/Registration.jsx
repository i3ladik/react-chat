import React, { useState } from 'react';

import './registration.css';
import Input from '../../utils/input/Input.jsx';
import { registration } from '../../actions/auth.js';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='registration'>
            <div className='registration_header'>Registration</div>
            <Input value={email} setValue={setEmail} type='text' placeholder='Email' />
            <Input value={password} setValue={setPassword} type='password' placeholder='Password' />
            <button className='registration_btn' onClick={() => registration(email, password)}>Sign Up</button>
        </div>
    );
};

export default Registration;