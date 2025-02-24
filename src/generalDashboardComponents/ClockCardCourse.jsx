import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './css/ClockCardCourse.css'; // Import custom styles

export default function ClockCardCourse() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);
    return (
        <div>
            <div className="clock-card-course">
                <div className="clock-container-course">
                    <p className="clock-title-course">Current Time</p>
                    <Clock value={value} className="styled-clock-course" />
                    <p className="digital-time-course">
                        {value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                </div>
            </div>
        </div>
    )
}
