import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from "react";
import logo from "./assets/logo.png";
import Modal from "./components/Modal.jsx";
import './font.css'
import LoadingPage from "./components/LoadingPage.jsx";

export default function Home() {
    const [subnetMask, setSubnetMask] = useState("");
    const [init, setInit] = useState(false);
    const [input, setInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                handleEnter();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input]);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(() => ({
        background: { image: "linear-gradient(135deg, black,  #0a192f, #1f2f98)", fullScreen: { enable: true } },
        fullScreen: { enable: true },
        particles: {
            number: {
                value: 80,
                density: { enable: true, area: 1000 },
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.8,
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false,
                },
            },
            size: { value: 5, random: true },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.5,
                width: 1.5,
                shadow: { enable: true, color: "#ffffff", blur: 10 },
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
            },
            shadow: { enable: true, color: "#ffffff", blur: 10 },
        },
        detectRetina: true,
    }), []);

    const handleButtonClick = (value) => {
        setInput((prev) => {
            // Allow only digits, dot, and slash
            if (!/^[0-9./]$/.test(value)) return prev;

            // Avoid repeating dots or slashes immediately
            const lastChar = prev.slice(-1);
            if ((value === '.' || value === '/') && lastChar === value) return prev;

            // Slash can appear only once
            if (value === '/' && prev.includes('/')) return prev;

            return prev + value;
        });
    };


    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleReset = () => {
        setInput("");
    };

    const handleEnter = async () => {
        setLoading(true);
        if (!input) {
            alert("Please enter an IP address.");
            return;
        }

        let ip = input;
        let subnet = null;
        let subnet_mask = null

        if (input.includes("/")) {
            [ip, subnet] = input.split("/");
        } else if (subnetMask) {
            subnet_mask = subnetMask; // fallback to entered subnet mask
        }


        if (input.includes("/")) {
            [ip, subnet] = input.split("/");
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ip,
                    subnet: subnet ? subnet : null,
                    subnet_mask: subnet_mask ? subnet_mask : null,
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                alert(`Error: ${errData.error || "Unknown error occurred."}`);
                return;
            }

            const data = await response.json();
            console.log("Result:", data);
            setResultData(data);
            setModalVisible(true);

        } catch (error) {
            alert(`Request failed: ${error.message}\nCheck if Flask server is running and CORS is allowed.`);
        }
        finally {
            setLoading(false);
        }
    };



    if (!init) return null;

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                    <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {/* Logo & Title */}
                        <div style={{
                            position: "absolute",
                            top: "58%",
                            padding: "2em",
                            textAlign: "left",
                            width: "300px",
                            alignSelf: "flex-start",
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                                <img src={logo}
                                    width="24%"
                                    height="24%"
                                    style={{
                                        marginRight: "5px"
                                    }} />
                                <h1 style={{
                                    fontSize: "4em",
                                    color: "#ffff",
                                    marginBottom: "2px",
                                    fontFamily: "monospace"
                                }}>
                                    NetWise</h1>
                            </div>
                            <h3 style={{ color: "#ffff", fontFamily: "monospace", fontSize: "17px" }}>Smart Subnet Calculator</h3>
                        </div>

                        {/* Calculator UI */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "10%",
                                transform: "translateY(-50%)",
                                width: "25%",
                                height: "70%",
                                background: "linear-gradient(135deg, #1ca7e3, #1f2f98)",
                                borderRadius: "10px",
                                padding: "2em",
                                color: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRight: "4px solid rgba(255, 255, 255, 0.3)",
                                borderBottom: "4px solid rgba(255, 255, 255, 0.3)",
                                boxShadow: "0 0 15px rgba(56, 149, 211, 0.7)",
                            }}
                        >
                            {/* Display Screen */}
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // Allow only digits, one slash, and dots
                                    if (/^[0-9./]*$/.test(value)) {
                                        const slashCount = (value.match(/\//g) || []).length;

                                        // Only allow one slash
                                        if (slashCount <= 1) {
                                            setInput(value);
                                        }
                                    }
                                }}
                                onPaste={(e) => {
                                    const pasted = e.clipboardData.getData('Text');
                                    if (!/^[0-9./]*$/.test(pasted) || (pasted.match(/\//g) || []).length > 1) {
                                        e.preventDefault();
                                    }
                                }}

                                placeholder="Enter IPv4 address"
                                style={{
                                    width: "90%",
                                    height: "20%",
                                    background: "linear-gradient(to bottom, #D3D3D3, #505050)",
                                    borderRadius: "5px",
                                    border: "3px solid rgb(39, 58, 182)",
                                    boxShadow: "0 0 10px rgba(0, 153, 255, 0.6)",
                                    padding: "10px",
                                    fontSize: "1.5em",
                                    fontFamily: 'digital7',
                                    fontWeight: "bold",
                                    color: "#222",
                                    fontStyle: input ? "normal" : "italic",
                                    opacity: input ? 1 : 0.9,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textAlign: "right",
                                }}
                            />
                            <input
                                type="text"
                                value={subnetMask}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[0-9.]*$/.test(value)) {
                                        setSubnetMask(value);
                                    }
                                }}
                                placeholder="Subnet Mask (e.g., 255.255.255.0)"
                                style={{
                                    width: "90%",
                                    height: "15%",
                                    marginTop: "10px",
                                    background: "linear-gradient(to bottom, #D3D3D3, #505050)",
                                    borderRadius: "5px",
                                    border: "3px solid rgb(39, 58, 182)",
                                    boxShadow: "0 0 10px rgba(0, 153, 255, 0.6)",
                                    padding: "10px",
                                    fontSize: "1.2em",
                                    fontFamily: 'digital7',
                                    fontWeight: "bold",
                                    color: "#222",
                                    fontStyle: subnetMask ? "normal" : "italic",
                                    opacity: subnetMask ? 1 : 0.9,
                                    textAlign: "right",
                                }}
                            />

                            {/* Number Pad */}
                            <div
                                style={{
                                    marginTop: "15px",
                                    width: "100%",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "10px",
                                }}
                            >
                                {Array.from({ length: 9 }, (_, i) => (
                                    <button key={i + 1} style={buttonStyle} onClick={() => handleButtonClick(i + 1)}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            {/* Bottom Row (0, Delete, Reset) */}
                            <div style={{ marginTop: "10px", width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                                <button style={buttonStyle} onClick={() => handleButtonClick(0)}>0</button>
                                <button style={buttonStyle} onClick={handleDelete}>⌫</button>
                                <button style={buttonStyle} onClick={handleReset}>C</button>
                            </div>

                            {/* Enter, Dot, Slash Buttons */}
                            <div style={{ marginTop: "15px", width: "100%", display: "flex", gap: "10px" }}>
                                <button
                                    style={{
                                        ...buttonStyle,
                                        flex: 1,
                                        background: "#1f2f98",
                                    }}

                                    onClick={() => handleButtonClick('.')}
                                >
                                    .
                                </button>

                                <button
                                    style={{
                                        ...buttonStyle,
                                        flex: 2,
                                        background: "#32cd32",
                                        fontSize: "1.2em",
                                    }}
                                    onClick={handleEnter}

                                >
                                    Start Subnetting
                                </button>

                                <button
                                    style={{
                                        ...buttonStyle,
                                        flex: 1,
                                        background: "#1f2f98",
                                    }}
                                    onClick={() => handleButtonClick('/')}
                                >
                                    /
                                </button>
                            </div>

                        </div>
                    </div>
                    {modalVisible && (
                        <Modal result={resultData} onClose={() => setModalVisible(false)} />
                    )}
                </div>
            )}
        </>
    );
}

const buttonStyle = {
    width: "100%",
    padding: "15px",
    fontSize: "1.5em",
    fontWeight: "bold",
    background: "rgba(255, 255, 255, 0.2)",
    border: "2px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 0 10px rgba(0, 153, 255, 0.6)",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s ease",
};