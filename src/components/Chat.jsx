import { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "user",
            content: "Hello world"
        },
        {
            sender: "ai",
            content: "Yesss"
        }
    ]);

    return (
        <section className="w-screen h-screen p-6 border border-slate-100">
            <h1 className="text-6xl text-violet-600">NexoTalk</h1>

            <ul className="py-2 px-3">
                {messages.map((message, index) => (
                    <li className="py-2 px-4" key={index}>
                        {message.sender === "user" ? <h2>User</h2> : <h2>NexoTalk</h2>}
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>

            <form
            className="fixed  bottom-0 left-0 right-0 h-20 border py-2 px-4 flex gap-4"
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
                } , {
                    headers: {
                        "Authorization": "Bearer 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",
                        "Accept": "application/json"
                    }
                })
                    .then(resp => {
                        setMessages(messages => ([
                            ...messages,
                            {
                                sender: "user",
                                content: query
                            },
                            {
                                sender: "ai",
                                content: resp.data.choices[0].message.content
                            }
                        ]))
                        setLoading(false);
                    })
            }}>
                <label htmlFor="query">Enter your promt:</label>
                <input className="px-4 py-1 rounded border" type="text" name="query" id="query" />
                <button className="px-6 py-1 rounded border border-slate-70" type="submit">Submit</button>
            </form>
        </section>
    );
}

export default Chat;