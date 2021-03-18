import firebase from 'firebase/app';
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import { firestore } from '../../firebase';
import './CreateRoom.css';

const CreateRoom = () => {

    const usersInfoRef = firestore.collection("usersInfo");
    const [usersInfo] = useCollectionData(usersInfoRef, { idField: "id" });

    const roomNameRef = useRef();
    const [selectedUsers, setSelectedUsers] = useState([]);

    const history = useHistory();

    return (
        <div className="create-room-form">
            <h1>Create here😊</h1>
            <form onSubmit={handleCreateRoom}>
                <input type="text" placeholder="Room name" required ref={roomNameRef} />

                <p>Add friends: </p>
                {usersInfo &&
                    usersInfo.map((user, i) => {
                        return (
                            <div className="addable-user" key={i}    >
                                <input
                                    type="checkbox"
                                    name="user"
                                    onChange={(e) => handleUserSelection(e, user)}
                                />{" "}
                                <label htmlFor="user">{user.displayName}</label>
                            </div>
                        );
                    })}

                <button className="btn submitBtn">Create room</button>
            </form>
        </div>
    );


    function handleUserSelection(e, user) {
        if(e.target.checked){
            const newUsersList = [...selectedUsers, user.id];
            setSelectedUsers(newUsersList);
        }
        else{
            const newUsersList = selectedUsers.filter(u => u.id != user.id);
            setSelectedUsers(newUsersList);
        }
    }

    async function handleCreateRoom(e) {
        e.preventDefault();
        // add room to chatRoomsList
        let roomId = '';
        const roomName = roomNameRef.current.value;
        const roomCreationTime = new Date().getTime();
        const chatRoomsListRef = firestore.collection('chatRoomsList');
        chatRoomsListRef.add({
            roomName: roomNameRef.current.value,
            roomCreationTime
        });
        
        //*************Detect newly created group ( add better solution later )
        const newRoomRef = firestore
        .collection("chatRoomsList")
        .where("roomName", "==", roomName)
        .where("roomCreationTime", "==", roomCreationTime);
        const snapshot = await newRoomRef.get().then((doc) => {
            doc.forEach(room => {
                console.log(room.id);
                roomId = room.id;
            })
        });
        
        // add room id to selected usersInfo
        roomId && selectedUsers.map(user => {
            usersInfoRef.doc(user).update({
                rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
            });
        })
        history.push(`/chatRoom/${roomId}`);
    }
};

export default CreateRoom;