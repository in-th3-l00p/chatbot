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
        <section className="w-full h-full p-6 border border-slate-300 relative rounded shadow-xl">
            <h1 className="text-3xl text-violet-600 text-center">NexoTalk</h1>

            <ul className="py-2 px-3 overflow-auto max-h-[85%]">
                {messages.map((message, index) => (
                    <li className={`py-2 px-4 ${message.sender == "user" ? "border-b border-slate-200" : ""}`} key={index}>
                        {message.sender === "user" ? <h2>User</h2> : <h2>NexoTalk</h2>}
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>

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
                {/* <label htmlFor="query">Enter your promt:</label> */}
                <input placeholder="Enter your prompt..." className="px-4 py-1 rounded border flex-grow" type="text" name="query" id="query" />
                <button className="px-6 py-1 rounded border border-slate-70 hover:bg-violet-500 transition-colors duration-200 hover:text-slate-50" type="submit">Submit</button>
            </form>
        </section>
    );
}

export default Chat;