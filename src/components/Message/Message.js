import React from 'react';
import './Message.css';

const Message = ({message}) => {
    const {text, time} = message;
    const photoURL = message.photoURL ? message.photoURL : "https://www.w3schools.com/w3images/avatar2.png";
    return (
        <div className="message">
            <img src={photoURL} alt="" className="user-photo" />
            <p className="message-text">{text}</p>
            <small>at {time.seconds}</small>
        </div>
    );
};

export default Message;