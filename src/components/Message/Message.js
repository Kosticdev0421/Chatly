import React from 'react';
import { auth } from '../../firebase';
import './Message.css';

const Message = ({message}) => {
    const {text, time, uid} = message;
    const photoURL = message.photoURL ? message.photoURL : "https://www.w3schools.com/w3images/avatar2.png";

    const messageType = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`message-box`}>
            <div className={`message ${messageType}`}>
                <img src={photoURL} alt="" className="user-photo" />
                <p className="message-text">{text}</p>
            </div>
            <small className="time">at {new Date(time).toLocaleTimeString()}</small>
        </div>
    );
};

export default Message;