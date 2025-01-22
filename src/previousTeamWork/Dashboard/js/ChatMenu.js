// ChatMenu.js
import React, { useState } from 'react';
import '../css/ChatMenu.css'; // Create and import your CSS for styling
import axios from 'axios';

const token = sessionStorage.getItem("token") || localStorage.getItem("token");
const apiUrl = process.env.REACT_APP_API_URL;

const ChatMenu = ({ onClose, isOpen }) => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]); // Array of message objects

    const chatMenuClass = isOpen ? "chat-menu open" : "chat-menu";

    const handleSendPrompt = async () => {
        if (prompt.trim()) {
            // Add the user's message to the chat
            const userMessage = { text: prompt, sender: 'user' };
            setMessages(messages => [...messages, userMessage]);
            
            try {
                // Send the prompt to the server and wait for the response
                const response = await axios.post(
                    `${apiUrl}/api/chat/message`, // Use the base URL from props
                    { prompt },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );
                
                // Add the API's response to the chat
                const apiMessage = { text: response.data.message, sender: 'api' };
                setMessages(messages => [...messages, apiMessage]);
            } catch (error) {
                console.error("Error sending message:", error);
                // Optionally add an error message to the chat interface
                const errorMessage = { text: "Error receiving a response.", sender: 'api' };
                setMessages(messages => [...messages, errorMessage]);
            }
            
            // Clear the input after sending
            setPrompt('');
        }
    };

    return (
        <div className={chatMenuClass}>
            <div className="chat-header">
                <button onClick={onClose}>Close</button>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'api-message'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendPrompt}>Send</button>
            </div>
        </div>
    );
};

export default ChatMenu;
