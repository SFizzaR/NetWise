import React, { useState } from "react";

const VLSMCalculator = ({ setResultData, setModalVisible, setLoading }) => {
    const [input, setInput] = useState("");
    const [baseNetwork, setBaseNetwork] = useState("");
    const [hostRequirements, setHostRequirements] = useState("");
    const [focusedField, setFocusedField] = useState('input');


    const handleButtonClick = (value) => {
        if (value === ',' && focusedField !== 'hostRequirements') {
            return;
        }
        if (value == '.' && focusedField == 'hostRequirements') {
            return;
        }
        if (focusedField === 'input') {
            setInput((prev) => prev + value);
        } else if (focusedField === 'baseNetwork') {
            setBaseNetwork((prev) => prev + value);
        } else if (focusedField === 'hostRequirements') {
            setHostRequirements((prev) => prev + value);
        }
    };


    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleReset = () => {
        setInput("");
    };

    const handleEnterVLSM = async () => {
        try {
            setLoading(true);

            const hostRequirementsArray = hostRequirements
                .split(',')
                .map((req) => parseInt(req.trim()))
                .filter((req) => !isNaN(req));

            const response = await fetch('http://127.0.0.1:5000/calculate_vlsm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    base_network: baseNetwork,
                    base_ip: input,
                    host_requirements: hostRequirementsArray,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setResultData(result);
                setModalVisible(true);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("VLSM calculation failed:", error);
            alert("An error occurred during VLSM calculation.");
        } finally {
            setLoading(false);
        }
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        fontSize: "1.2em",
        fontWeight: "bold",
        background: "#0f766e",
        border: "2px solid #14b8a6",
        boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)",
        borderRadius: "5px",
        color: "#fff",
        cursor: "pointer",
        fontFamily: "Orbitron",
        transition: "0.3s",
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                right: "10%",
                transform: "translateY(-50%)",
                width: "25vw",
                minWidth: "280px",
                maxWidth: "400px",
                height: "75vh",
                background: "linear-gradient(135deg, #022c22, #065f46)",
                borderRadius: "10px",
                padding: "2em",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "4px solid rgba(255, 255, 255, 0.1)",
                borderBottom: "4px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 0 20px rgba(6, 95, 70, 0.8)",
            }}
        >
            {/* Display input field */}
            <input
                type="text"
                value={input}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9./]*$/.test(value)) {
                        const slashCount = (value.match(/\//g) || []).length;
                        if (slashCount <= 1) {
                            setInput(value);
                        }
                    }
                }}
                onFocus={() => setFocusedField('input')}
                onPaste={(e) => {
                    const pasted = e.clipboardData.getData("Text");
                    if (!/^[0-9./]*$/.test(pasted) || (pasted.match(/\//g) || []).length > 1) {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter Base IPv4 Address"
                style={{
                    width: "90%",
                    height: "20%",
                    background: "#e0f2f1",
                    borderRadius: "5px",
                    border: "3px solid #14b8a6",
                    boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)",
                    padding: "10px",
                    fontSize: "1.5em",
                    fontFamily: "digital7",
                    fontWeight: "bold",
                    color: "#065f46",
                    fontStyle: input ? "normal" : "italic",
                    opacity: input ? 1 : 0.9,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                }}
            />
            {/* New Input for Base Network */}
            <input
                type="text"
                value={baseNetwork}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9./]*$/.test(value)) {
                        const slashCount = (value.match(/\//g) || []).length;
                        if (slashCount <= 1) {
                            setBaseNetwork(value);
                        }
                    }
                }}
                onFocus={() => setFocusedField('baseNetwork')}
                onPaste={(e) => {
                    const pasted = e.clipboardData.getData("Text");
                    if (!/^[0-9./]*$/.test(pasted) || (pasted.match(/\//g) || []).length > 1) {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter Base Network"
                style={{
                    marginTop: "6px",
                    width: "90%",
                    height: "20%",
                    background: "#e0f2f1",
                    borderRadius: "5px",
                    border: "3px solid #14b8a6",
                    boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)",
                    padding: "10px",
                    fontSize: "1.5em",
                    fontFamily: "digital7",
                    fontWeight: "bold",
                    color: "#065f46",
                    fontStyle: baseNetwork ? "normal" : "italic",
                    opacity: baseNetwork ? 1 : 0.9,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                }}
            />
            {/* New Input for Host Requirements */}
            <input
                type="text"
                value={hostRequirements}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9,]*$/.test(value)) {
                        const slashCount = (value.match(/\//g) || []).length;
                        if (slashCount <= 1) {
                            setHostRequirements(value);
                        }
                    }
                }}
                onFocus={() => setFocusedField('hostRequirements')}
                onPaste={(e) => {
                    const pasted = e.clipboardData.getData("Text");
                    if (!/^[0-9,]*$/.test(pasted) || (pasted.match(/\//g) || []).length > 1) {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter Host Requirements (comma-separated)"
                style={{
                    marginTop: "6px",
                    width: "90%",
                    height: "20%",
                    background: "#e0f2f1",
                    borderRadius: "5px",
                    border: "3px solid #14b8a6",
                    boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)",
                    padding: "10px",
                    fontSize: "1em",
                    fontFamily: "digital7",
                    fontWeight: "bold",
                    color: "#065f46",
                    fontStyle: hostRequirements ? "normal" : "italic",
                    opacity: hostRequirements ? 1 : 0.9,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                }}
            />

            {/* Buttons grid */}
            <div
                style={{
                    marginTop: "10px",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                }}
            >
                {Array.from({ length: 9 }, (_, i) => (
                    <button key={i + 1}
                        style={buttonStyle}
                        onClick={() => handleButtonClick(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* 0, Delete, Reset buttons */}
            <div
                style={{
                    marginTop: "7px",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                }}
            >
                <button
                    style={buttonStyle}
                    onClick={() => handleButtonClick(0)}
                >
                    0
                </button>
                <button
                    style={buttonStyle}
                    onClick={handleDelete}
                >
                    ⌫
                </button>
                <button
                    style={buttonStyle}
                    onClick={handleReset}
                >
                    C
                </button>
            </div>

            {/* Dot, Start VLSM, Slash buttons */}
            <div
                style={{
                    marginTop: "10px",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px"
                }}
            >
                <button
                    style={{
                        ...buttonStyle,
                        background: "#1e293b"
                    }}
                    onClick={() => handleButtonClick(".")}
                >
                    .
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        background: "#1e293b"
                    }}
                    onClick={() => handleButtonClick(",")}
                >
                    ,
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        background: "#1e293b"
                    }}
                    onClick={() => handleButtonClick("/")}
                >
                    /
                </button>
            </div>

            {/* Start VLSM button */}
            <div
                style={{
                    marginTop: "10px",
                    width: "100%"
                }}
            >
                <button
                    style={{
                        ...buttonStyle,
                        width: "100%",
                        background: "#10b981",
                        fontSize: "1em",
                        color: "#fff",
                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.7)",
                    }}
                    onClick={handleEnterVLSM}
                >
                    Start VLSM
                </button>
            </div>
        </div>
    );
};

export default VLSMCalculator;
