import React from 'react';

import './li.css';

const Li = (props) => {
    return (
        <li className='customLi'>
            <span>{props.name}</span>: {props.text}
        </li>
    );
};

export default Li;