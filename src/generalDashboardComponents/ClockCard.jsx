import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './css/ClockCard.css'; // Import custom styles

export default function ClockCard() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);
    return (
        <div>
            <div className="clock-card" style={{height:'461px'}}>
                <div className="clock-container">
                    <p className="clock-title">Current Time</p>
                    <Clock value={value} className="styled-clock" />
                    <p className="digital-time">
                        {value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                </div>
            </div>
        </div>
    )
}
