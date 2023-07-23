import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './chat.css';
import { getMessages, sendMessage } from '../../actions/message.js';
import Li from '../../utils/li/Li.jsx';
import Input from '../../utils/input/Input.jsx';

const Chat = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const [content, setContent] = useState('');
    const [messageList, setMessageList] = useState([]);

    const gettingMessages = async () => {
        const messages = await getMessages();
        setMessageList((prevMessageList) => [...prevMessageList, ...messages]);
    }

    const sendHandle = async () => {
        const result = await sendMessage(content);
        if(result) setContent('');
    }

    useEffect(() => {
        gettingMessages();
        const wsocket = new WebSocket(`wss://${process.env.REACT_APP_API_URL}/api/ws`);
        wsocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessageList((prevMessageList) => [...prevMessageList, data]);
        };
        const list = document.getElementsByClassName('chat_window_messages_list').item(0);
        list.scrollTop = list.offsetHeight;
    }, []);

    return (
        <div className='chat'>
            <div className='container'>
                <div className='chat_window'>
                    <div className='chat_window_messages'>
                        <ul className='chat_window_messages_list'>
                            {messageList.map((message, index) => (
                                <Li key={index} name={message.nickname} text={message.content} />
                            ))}
                        </ul>
                    </div>
                    {
                        isAuth &&
                        <div className='chat_window_typing'>
                            <Input value={content} setValue={setContent} type='text' placeholder='Enter the text here' />
                            <button className='chat_window_typing_button' onClick={sendHandle}>Send</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;