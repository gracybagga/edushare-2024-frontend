import React from "react";
import { motion } from "framer-motion";

const LoadingAndErrorComponent = ({ loading, error }) => {
    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
                <motion.div
                    style={{ width: '50px', height: '50px' }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <svg width="50" height="50" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" stroke="#007bff" strokeWidth="4" fill="none" strokeDasharray="125" strokeDashoffset="100"></circle>
                    </svg>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}
                >
                    Hang tight! We're fetching data...
                </motion.p>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', color: '#d9534f' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🚨</div>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Uh-oh! Something broke.</p>
                <p style={{ fontSize: '16px' }}>{error}</p>
            </motion.div>
        );
    }

    return null;
};

export default LoadingAndErrorComponent;