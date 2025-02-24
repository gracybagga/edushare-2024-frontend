import React from 'react'
import { useState } from 'react'

export default function Modal() {
    // Array of knowledge tips
    const knowledgeTips = [
        "Consistency is Key! Even dedicating just 15-30 minutes a day to learning can lead to significant progress over time. Break down your study sessions into smaller, focused chunks to retain more information and avoid burnout.",
        "Active recall and spaced repetition are powerful study techniques! Instead of passively reading through your notes, try testing yourself on the material and revisiting concepts at spaced intervals. This helps strengthen memory retention.",
        "Do not just read — engage! Try summarizing the material in your own words or teach it to someone else. This helps deepen your understanding and improves retention.",
        "Set specific learning goals for each session. Having a clear objective helps you stay focused and measure your progress more effectively.",
        "Take regular breaks to avoid burnout! Studies show that short breaks during study sessions increase focus and retention. Try the Pomodoro technique for better productivity.",
        "Mistakes are part of the learning process! Do not be discouraged by them. Analyze your errors, learn from them, and keep progressing.",
        "Mix up your learning methods! Use videos, quizzes, and discussions to reinforce what you've learned. A multi-sensory approach helps enhance memory.",
        "Stay organized! Keep your study materials, notes, and tasks well-organized. This reduces stress and helps you focus on learning rather than finding materials.",
        "Make learning fun! Engage with interactive content, challenges, or flashcards to turn studying into a more enjoyable experience.",
        "Sleep is crucial for memory consolidation. Make sure you are getting enough rest, especially before and after intense learning sessions to retain information better.",
        "Mindfulness can improve focus. Take a few minutes before studying to practice deep breathing or meditation to clear your mind and improve concentration.",
        "Learning with a group can enhance understanding. Discussing concepts with peers helps reinforce ideas and exposes you to different perspectives on the material.",
        "Visual aids like mind maps, diagrams, or charts can help break down complex concepts and make them easier to understand and memorize.",
        "Teach what you learn! Teaching others is one of the best ways to solidify your knowledge. It forces you to explain concepts clearly and think critically about the material.",
        "Avoid multitasking while studying. Focus on one task at a time for better efficiency and improved retention of information.",
        "Review your notes regularly. Consistent review is crucial to long-term retention, especially when you space out your review sessions over time.",
        "Create a dedicated study space free from distractions. A quiet, organized area helps signal your brain that it is time to focus and learn.",
        "Use online resources and apps to enhance your learning experience. From flashcards to interactive quizzes, there are plenty of tools to help reinforce what you are learning.",
        "Staying hydrated is essential for cognitive function. Drink plenty of water while studying to help maintain focus and alertness.",
        "Set a reward system for yourself. Celebrate small victories and milestones in your learning process to stay motivated and engaged."
    ];

    // State to hold the random tip
    const [randomTip, setRandomTip] = useState('');

    // Function to get a random tip
    const getRandomTipHandler = () => {
        const randomIndex = Math.floor(Math.random() * knowledgeTips.length);
        setRandomTip(knowledgeTips[randomIndex]);
    };

  return (
    <div>
        {/* Button to trigger Modal */}
        <button type="button" className="btn btn-primary" onClick={getRandomTipHandler} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Knowledge for the day
        </button>

        {/* Modal */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content" style={{ background: 'transparent', boxShadow: 'none' }}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Did you know?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-dark">
                {randomTip}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary">Understood</button> */}
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
