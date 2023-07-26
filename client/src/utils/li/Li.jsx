import React from 'react';

import './li.css';

const Li = (props) => {
    return (
        <li className='customLi'>
            <div className='customLi_message'>
                <span className='customLi_message_nickName'>{props.name}</span>: {props.text}
            </div>
            <div className='customLi_timestamp'>{new Date(props.timestamp).toLocaleString()}</div>
        </li>
    );
};

export default Li;