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
            }}>
                <label htmlFor="query">Enter your promt:</label>
                <input type="text" name="query" id="query" />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default SelectChat;