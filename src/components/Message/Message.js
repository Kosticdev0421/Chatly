import React, { useRef, useState } from "react";
import { auth, firestore } from "../../firebase";
import "./Message.css";

const Message = ({ message, length, nextMessage }) => {
    const bottom = useRef();
    const { text, time, uid } = message;
    const [displayName, setDisplayName] = useState("");
    getDisplayName();
    const photoURL = message.photoURL
        ? message.photoURL
        : "https://www.w3schools.com/w3images/avatar2.png";
    const messageType = uid === auth.currentUser.uid ? "sent" : "received";
    const lastMessage = length.i === length.numberOfMessages - 1;
    const loadMoreMessages = length.numberOfMessages > 20;


    const consecutiveTwoMsgsAreNotFromSameUserAndSentMoreThan2MinAgo = nextMessage?.uid !== uid && nextMessage?.time - time > 12000;

    lastMessage &&
        !loadMoreMessages &&
        bottom.current &&
        bottom.current.scrollIntoView({ behavior: "smooth", bottom: bottom.current.offsetBottom });

    return (
        <div className={`message-box`}>
            <div className={`message ${messageType}`}>
                <img src={photoURL} alt="" className="user-photo" />
                <p className="message-text">{text}</p>
            </div>
            {(consecutiveTwoMsgsAreNotFromSameUserAndSentMoreThan2MinAgo ||
                lastMessage) && (
                    <small className="time">
                        {displayName} at {new Date(time).toLocaleTimeString()}
                    </small>
                )}
            <span ref={bottom}></span>
        </div>
    );

    async function getDisplayName() {
        const usersInfoRef = firestore.collection("usersInfo").doc(uid);
        const doc = await usersInfoRef.get();
        if (!doc.exists) {
            console.log("No such document!");
        } else {
            setDisplayName(doc.data().displayName);
        }
    }
};

export default Message;
