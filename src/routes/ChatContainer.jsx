import axios from "axios";
import { db } from "../server/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Chat from "../components/Chat";

const ChatContainer = () => {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState("BJUkzPxBJj70JTb6Z3LM");

    useEffect(() => {
        getDocs(collection(db, "chats"))
            .then(chats => {
                console.log(chats);
                setChats(chats);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <p>loading...</p>
    return (
        <main className="h-screen w-screen p-8">
            {/* sidebar */}
            <div>

            </div>

            {currentChat && (
                <Chat id={currentChat} />
            )}
        </main>
    );
}

export default ChatContainer;