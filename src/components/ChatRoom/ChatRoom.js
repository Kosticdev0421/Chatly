import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase';
import Message from '../Message/Message';
import SignOut from '../SignOut/SignOut';
import './ChatRoom.css';

const ChatRoom = () => {
    const messageInputRef = useRef();

    const [disabled, setDisabled] = useState(true); 

    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("time").limit(50);
    const [messages] = useCollectionData(query, { idField: "id" });
    
    function sendMessage(e) {
        e.preventDefault();
        const text = messageInputRef.current.value;
        const {uid} = auth.currentUser;

        messagesRef.add({
            text,
            time: new Date().getTime(),
            uid
        });
        messageInputRef.current.value = "";
        setDisabled(true)

    }

    return (
        <div className="room">
            <header className="room-header">
                <h2>❌</h2>
                <h2>Room name</h2>
                <SignOut />
            </header>
            <main className="room-message-display">
                {messages &&
                    messages.map((message) => {
                        return <Message key={message.id} message={message} />;
                    })}
                
            </main>
            <form onSubmit={sendMessage} className="room-message-input-form">
                <input type="text" placeholder="Write something nice" ref={messageInputRef} onChange={(e) => e.target.value === "" ? setDisabled(true) : setDisabled(false)}/>
                <button className="btn sendBtn" disabled={disabled}>Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;