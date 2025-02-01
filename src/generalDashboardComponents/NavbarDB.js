import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import scholarship from "../pages/img/scholarship.png";

export default function NavbarDB({ onToggleSidebar, onToggleChatbot, theme }) {
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${theme==="light"?'dark':'light'} bg-${theme==="light"?'dark':'light'} border-bottom`}>
                <div className="container-fluid">
                    <button
                        className={`btn d-inline`}
                    >
                        <img src={scholarship} alt='logo' style={{maxHeight:'35px'}}/>
                    </button>
                    <span className="navbar-brand text-left">EduShare</span>
                    <button
                        className={`btn btn-${theme==="light"?'dark':'light'} d-inline`}
                        onClick={onToggleChatbot}
                        aria-label="Toggle Chatbot"
                    >
                        <i className="bi bi-chat-square-dots"></i>
                    </button>
                </div>
            </nav>
        </>
    );
}
