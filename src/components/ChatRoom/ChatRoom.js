import React from 'react';
import './ChatRoom.css';

const ChatRoom = () => {


    function sendMessage(e) {
        e.preventDefault();
    }

    return (
        <div className="room">
            <header className="room-header">
                <h2>{"<<"}</h2>
                <h2>Room name</h2>
                <h2>i</h2>
            </header>
            <main className="room-message-display">
                
            </main>
            <form onSubmit={sendMessage} className="room-message-input-form">
                <input type="text" placeholder="Write something nice" />
                <button className="btn sendBtn">Send</button>
            </form>

        </div>
    );
};

export default ChatRoom;