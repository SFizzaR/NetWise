import React from 'react';
import Lottie from 'lottie-react';
import spinner from '../assets/spinner.json';

export default function LoadingPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundImage: "linear-gradient(135deg, black, #0a192f, #1f2f98)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                fontFamily: "monospace",
            }}
        >
            <Lottie
                animationData={spinner}
                loop={true}
                style={{ width: 300, height: 300 }}
            />
            <p style={{
                marginTop: "20px",
                fontSize: "1.5em",
                animation: "blinker 1.5s linear infinite",
            }}>
                Fetching details...
            </p>

            {/* Add a simple blink animation */}
            <style>
                {`
                    @keyframes blinker {
                        50% { opacity: 0.5; }
                    }
                `}
            </style>
        </div>
    );
}
