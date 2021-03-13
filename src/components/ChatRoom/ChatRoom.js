import React from 'react';
import './ChatRoom.css';

const ChatRoom = () => {
    return (
        <div className="room">
            <header className="room-header">
                <h2>{"<<"}</h2>
                <h2>Room name</h2>
                <h2>i</h2>
            </header>
            <main className="room-message-display">
                
            </main>
            <div className="room-message-input">

            </div>

        </div>
    );
};

export default ChatRoom;