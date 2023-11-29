import { db } from "../server/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Chat from "../components/Chat";

const ChatContainer = () => {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        if (chats === null) {
            setLoading(true);
            getDocs(collection(db, "chats"))
                .then(chats => setChats(chats.docs.map(doc => doc.id)))
                .finally(() => setLoading(false));
        }
    }, [chats]);

    if (loading)
        return <p>loading...</p>
    return (
        <main className="h-screen w-screen p-8 flex gap-5">
            <aside className="w-32 h-full bg-white shadow-xl border-2 rounded-xl">
                <ul>
                    {chats.map((docid, index) => (
                        <li key={index}>
                            <button onClick={() => setCurrentChat(docid)}>
                                Chat {index}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => {
                    addDoc(collection(db, "chats"), { messages: [] })
                        .then(() => {
                            setLoading(true);
                            setChats(null);
                        })
                }}>
                    +
                </ button>
            </aside>

            {currentChat ? (
                <Chat id={currentChat} />
            ) : (
                <div className="bg-white w-full h-full shadow-xl border-2">
                </div>
            )}
        </main>
    );
}

export default ChatContainer;