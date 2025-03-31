import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/ChatbotCanvas.css'; // Custom CSS for additional styling

export default function ChatbotDB({ isVisible, onClose, theme }) {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! How can I assist you today?' },
    ]);
    const [userMessage, setUserMessage] = useState('');

    const askAssistant = async () => {
        if (!userMessage.trim()) return;
    
        // Add user's message to the chat
        setMessages([...messages, { type: 'user', text: userMessage }]);
    
        try {
            // Make a POST request to the backend using fetch
            const response = await fetch(`${import.meta.env.VITE_EDUSHARE_BACKEND_URL}/api/ai/chat`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ message : userMessage }),
                credentials: "include", // Required for sending cookies
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
    
            if (data.success) {
                // Add the bot's response to the chat
                setMessages((prev) => [...prev, { type: 'bot', text: data.response }]);
            } else {
                // Handle unexpected cases
                setMessages((prev) => [
                    ...prev,
                    { type: 'bot', text: 'Sorry, I could not understand your question. Please try again.' },
                ]);
            }
        } catch (error) {
            // Handle error gracefully
            console.error("Error communicating with the chatbot:", error);
            setMessages((prev) => [
                ...prev,
                { type: 'bot', text: 'Oops! Something went wrong. Please try again later.' },
            ]);
        }
    
        // Clear the input field
        setUserMessage('');
    };    

    return (
        <div
            className={`offcanvas offcanvas-end ${isVisible ? 'show' : ''}`}
            tabIndex="-1"
            style={{ 
                visibility: isVisible ? 'visible' : 'hidden', 
                height: '100vh',
                backgroundColor: `${theme==="light"?'#f8f9fa':'rgb(33,37,41)'}`,
                borderLeft: '1px solid #dee2e6',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header */}
            <div className="offcanvas-header" data-bs-theme={theme} style={{ borderBottom: '1px solid #dee2e6' }}>
                <h6 className="offcanvas-title" style={{ fontWeight: 'bold' , color:`${theme==="light"?'black':'white'}`}}>
                    Hi! Your virtual assitant is here to help you.<br/>
                    How may I help you?
                </h6>
                <button
                    type="button"
                    className={`btn-close`}
                    aria-label="Close"
                    onClick={onClose}
                    
                ></button>
            </div>

            {/* Chat Body */}
            <div className="offcanvas-body flex-grow-1 overflow-auto d-flex flex-column" style={{ padding: '1rem', gap: '0.5rem' }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.type === 'bot' ? 'bot-message' : 'user-message'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="chat-input-container" style={{ borderTop: '1px solid #dee2e6', padding: '0.5rem' }}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        aria-label="Message"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" type="button" onClick={askAssistant}>
                        <i className="bi bi-send"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
