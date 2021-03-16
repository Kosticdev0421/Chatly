import React, { useRef, useState } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import Message from '../Message/Message';
import SignOut from '../SignOut/SignOut';
import './ChatRoom.css';

// let m = [];
const ChatRoom = () => {
    const { roomId } = useParams();
    const messageInputRef = useRef();
    const [messageLimit, setMessageLimit] = useState(20);
    const [roomName] = useDocumentData(firestore.collection("chatRoomsList").doc(roomId));

// ############## Option 1.1: Loading only room messages from all messages ( Completed )
    const messagesRef = firestore.collection("messages");
    const roomMessagesRef = messagesRef
        .where("roomId", "==", roomId)
        .orderBy("time", "desc")
        .limit(messageLimit);
    let [messages] = useCollectionData(roomMessagesRef, { idField: "id" });
    messages = messages && messages.reverse();
    console.log(messages);

// ############## Option 1.2: using useEffect hook ( Incomplete: Messages don't automatically refresh )
    // const [messages, setMessages]= useState([]);
    // useEffect(()  => {
    //     roomMessagesRef.get().then((res) => {
    //         if (res.empty) {
    //             console.log("No matching documents.");
    //             return;
    //         } else {
    //             res.forEach((doc) => {
    //                 // console.log(doc.id, "=>", doc.data());
    //                 m = [doc.data(), ...m];
    //                 setMessages(m);
    //             });
    //         }
    //     });

    // }, [])
    // console.log(messages, m);

// ################ Option 2: Loading from specific rooms messages ( Completed )
    // const roomRef = firestore.collection("chatRooms").doc(roomId);
    // const [room] = useDocumentData(roomRef, {idField: "id"});
    // console.log(room)
    // const messages = room && room.messages.slice(room.messages.length - 20);

    function sendMessage(e) {
        e.preventDefault();
        const text = messageInputRef.current.value;
        const { uid } = auth.currentUser;

        if(text.replaceAll(' ', '')) {
            // roomRef.update(
            //     {
            //         messages: firebase.firestore.FieldValue.arrayUnion({
            //             text,
            //             time: new Date().getTime(),
            //             uid,
            //         })
            //     }
            // );

            messagesRef.add({
                text,
                time: new Date().getTime(),
                uid,
                roomId,
            })
        }
        messageInputRef.current.value = "";
    }


    return (
        <div className="room">
            <header className="room-header">
                <Link to="/chatRoomsList" className="link-text">
                    <h2>⬅</h2>
                </Link>
                <h2>{roomName && roomName.roomName}</h2>
                <SignOut />
            </header>
            <main className="room-message-display">
                <button className="btn" onClick={() => setMessageLimit(messageLimit + 10)}>
                    Load more
                </button>
                {!messages && <h2 style={{ color: "ghostWhite" }}>Loading conversations...</h2>}
                {messages &&
                    messages.map((message, i, msgs) => {
                        return (
                            <Message
                                key={i}
                                message={message}
                                nextMessage={msgs[i+1]}
                                length={{ i, numberOfMessages: messages.length }}
                            />
                        );
                    })}
            </main>
            <form onSubmit={sendMessage} className="room-message-input-form">
                <input
                    type="text"
                    placeholder="Write something nice"
                    ref={messageInputRef}
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Write something nice here😊")}
                />
                <button className="btn sendBtn">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;