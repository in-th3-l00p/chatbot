import { useState, useEffect } from "react";
import axios from "axios";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../server/firebase";
import NexoLogo from "../nexo-talk.png";
import UserLogo from "../user.png";

const API_KEY = "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";

const Chat = ({ id }) => {
    const currentDoc = doc(collection(db, "chats"), id);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDoc(currentDoc)
            .then(content => {
                const data = content.data()
                if (data?.messages) {
                    setMessages(content.data().messages)
                }
            })
            .catch(error => setError("Error occured"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return <p>loading...</p>
      const isMessagesValid = Array.isArray(messages) && messages.length > 0;

    return (
        <section className="w-full h-full p-6 border border-slate-300 relative rounded shadow-xl">
            <h1 className="text-3xl text-violet-600 text-center">NexoTalk</h1>
            {error && <div className="text-red-600 !">{error}</div>}
            {isMessagesValid && <ul className="py-2 px-3 overflow-auto max-h-[85%]">
                {messages.map((message, index) => (
                    <li className={`py-2 px-4 ${message.sender == "user" ? "border-b border-slate-200" : ""}`} key={index}>
                        {message.sender === "user" ? <h2 className="flex items-center gap-4">
                            <div className="h-10 w-10 flex items-center">
                                <img src={UserLogo} />
                            </div>
                            User</h2> : <h2 className="flex items-center gap-4"> <div className="h-10 w-10 flex items-center">
                                <img src={NexoLogo} />
                            </div>
                            NexoTalk</h2>}
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>}

            <form
                className="absolute  bottom-0 left-0 right-0 h-20 border py-2 px-4 flex gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const query = data.get("query");
                    setLoading(true);
                    axios.post("https://api.openai.com/v1/chat/completions", {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            {
                                "role": "system",
                                "content": "you are a senior javascript developer, your name is NexoTalk"
                            },
                            ...(messages
                                .filter(message => message.sender === "user")
                                .map(message => ({
                                    "role": "user",
                                    "content": message.content
                                }))),
                            {
                                "role": "user",
                                "content": query
                            }
                        ]
                    }, {
                        headers: {
                            "Authorization": `Bearer ${API_KEY}`,
                            "Accept": "application/json"
                        }
                    })
                        .then(resp => {
                            setMessages(messages => {
                                const newMessages = ([
                                    ...messages,
                                    {
                                        sender: "user",
                                        content: query
                                    },
                                    {
                                        sender: "ai",
                                        content: resp.data.choices[0].message.content
                                    }
                                ]);

                                updateDoc(currentDoc, { messages: newMessages });
                                return newMessages;
                            });
                            setLoading(false);
                        })
                }}>
                {/* <label htmlFor="query">Enter your promt:</label> */}
                <input placeholder="Enter your prompt..." className="px-4 py-1 rounded border flex-grow" type="text" name="query" id="query" />
                <button className="px-6 py-1 rounded border border-slate-70 hover:bg-violet-500 transition-colors duration-200 hover:text-slate-50" type="submit">Submit</button>
            </form>
        </section>
    );
}

export default Chat;