import axios from "axios";
import React, { useState } from "react";

const SelectChat = () => {
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
        <section className="w-screen h-screen">
            <h1>NexoTalk</h1>

            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.sender === "user" ? <h2>User</h2> : <h2>NexoTalk</h2>}
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>

            <form onSubmit={(e) => {
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
                <input type="text" name="query" id="query" />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default SelectChat;