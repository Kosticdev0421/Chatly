import React, { useState } from 'react';
import "./ChatRoomsList.css";

const ChatRoomsList = () => {
    const [chatRooms, setChatRooms] = useState(["Math group 🥇", "Family 💪"])
    return (
        <div>
            {
                chatRooms.map(room => {
                    return (
                        <div className="chat-room-list">
                            {room}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ChatRoomsList;