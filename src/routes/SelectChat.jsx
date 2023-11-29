import React, { useState } from "react";

const SelectChat = () => {
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
        <main className="h-screen w-screen p-8">
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
                }}>
                <label htmlFor="query">Enter your promt:</label>
                <input className="px-4 py-1 rounded border" type="text" name="query" id="query" />
                <button className="px-6 py-1 rounded border border-slate-70" type="submit">Submit</button>
            </form>
        </section>
        </main>
    );
}

export default SelectChat;