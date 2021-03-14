import React, { useState } from 'react';
import { auth, firestore } from '../../firebase';
import './Message.css';

const Message = ({message}) => {
    const {text, time, uid} = message;
    const photoURL = message.photoURL ? message.photoURL : "https://www.w3schools.com/w3images/avatar2.png";
    const messageType = uid === auth.currentUser.uid ? "sent" : "received";

    const [displayName, setDisplayName] = useState("");
    getDisplayName();
    return (
        <div className={`message-box`}>
            <div className={`message ${messageType}`}>
                <img src={photoURL} alt="" className="user-photo" />
                <p className="message-text">{text}</p>
            </div>
            <small className="time">{displayName} at {new Date(time).toLocaleTimeString()}</small>
        </div>
    );

    async function getDisplayName() {
    const nameRef = firestore.collection("displayNames").doc(uid);
    const doc = await nameRef.get();
    if (!doc.exists) {
        console.log("No such document!");
    } else {
        setDisplayName(doc.data().displayName);
    }

    }
};

export default Message;