import React from 'react';

import './input.css';

const Input = (props) => {
    return (
        <input
            className='customInput'
            onChange={(event) => props.setValue(event.target.value)}
            value={props.value}
            type={props.type}
            placeholder={props.placeholder}
            onKeyDown={props.handle}
        />
    );
};

export default Input;