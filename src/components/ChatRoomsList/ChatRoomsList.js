import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import SignOut from '../SignOut/SignOut';
import "./ChatRoomsList.css";

const ChatRoomsList = () => {
    const currentUser = auth.currentUser;
    
    const usersInfoRef = firestore.collection('usersInfo');
    const [usersInfo] = useCollectionData(usersInfoRef, {idField: "id"});
    const roomsIdList = usersInfo && usersInfo.filter(user => user.id === currentUser.uid)[0].rooms;

    const chatRoomsListRef = firestore.collection("chatRoomsList");
    let [roomsList] = useCollectionData(chatRoomsListRef, {idField: "id"});
    console.log("!!!", roomsList);
    roomsList = roomsList && roomsIdList.map(id => {
        const room = roomsList.filter(room => {
            return room.id === id
        })
        return room[0];
    })
    console.log("Rooms list:", roomsList);
    

    return (
        <div className="chat-room-list-box">
            <SignOut />
            {roomsList &&
                roomsList.map((room) => {
                    return (
                        <div key={room.id} className="chat-room-list">
                            <Link
                                to={`/chatRoom/${room.id}`}
                                className="link-text"
                            >
                                {room.roomName}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );

};

export default ChatRoomsList;