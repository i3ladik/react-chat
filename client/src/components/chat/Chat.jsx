import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import './chat.css';
import Li from '../../utils/li/Li.jsx';
import Input from '../../utils/input/Input.jsx';

const Chat = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const [text, setText] = useState('');

    let messages = [];
    while (messages.length < 20) messages.push({ name: 'Tester', text: 'test' });

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <div className='chat'>
            <div className='container'>
                <div className='chat_window'>
                    <div className='chat_window_messages'>
                        <ul className='chat_window_messages_list'>
                            {messages.map((message, index) => (
                                <Li key={index} name={message.name} text={message.text} />
                            ))}
                            <AlwaysScrollToBottom />
                        </ul>
                    </div>
                    {
                        isAuth &&

                        <div className='chat_window_typing'>
                            <Input value={text} setValue={setText} type='text' placeholder='Enter the text here' />
                            <button className='chat_window_typing_button'>Send</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;