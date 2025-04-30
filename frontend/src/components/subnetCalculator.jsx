import React, { useState, useEffect } from "react";

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
    fontFamily: "Orbitron"

};

const SubnetCalculator = ({ setResultData, setModalVisible, setLoading }) => {
    const [input, setInput] = useState("");
    const [subnetMask, setSubnetMask] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                handleEnter();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input]);

    const handleButtonClick = (value) => {
        setInput((prev) => {
            if (!/^[0-9./]$/.test(value)) return prev;
            const lastChar = prev.slice(-1);
            if ((value === '.' || value === '/') && lastChar === value) return prev;
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
            setLoading(false);
            return;
        }

        let ip = input;
        let subnet = null;
        let subnet_mask = null;

        if (input.includes("/")) {
            [ip, subnet] = input.split("/");
        } else if (subnetMask) {
            subnet_mask = subnetMask;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/calculate_subnet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ip,
                    subnet: subnet || null,
                    subnet_mask: subnet_mask || null,
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
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            style={{
                position: "absolute",
                top: "50%",
                left: window.innerWidth > 768 ? "auto" : "50%",
                right: window.innerWidth > 768 ? "10%" : "auto",
                transform: window.innerWidth > 768 ? "translateY(-50%)" : "translate(-50%, -50%)",
                width: window.innerWidth > 768 ? "25vw" : "90%",
                maxWidth: "400px",
                minWidth: "280px",
                height: "auto",
                minHeight: "500px",
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
            <input
                type="text"
                value={input}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9./]*$/.test(value)) {
                        const slashCount = (value.match(/\//g) || []).length;
                        if (slashCount <= 1) setInput(value);
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
                    if (/^[0-9.]*$/.test(value)) setSubnetMask(value);
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
            <div style={{
                marginTop: "15px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
            }}>
                {Array.from({ length: 9 }, (_, i) => (
                    <button key={i + 1} style={buttonStyle} onClick={() => handleButtonClick(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
            {/* Bottom Row */}
            <div style={{
                marginTop: "10px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
            }}>
                <button style={buttonStyle} onClick={() => handleButtonClick(0)}>0</button>
                <button style={buttonStyle} onClick={handleDelete}>⌫</button>
                <button style={buttonStyle} onClick={handleReset}>C</button>
            </div>
            {/* Enter, Dot, Slash */}
            <div style={{
                marginTop: "15px",
                width: "100%",
                display: "flex",
                gap: "10px",
            }}>
                <button style={{ ...buttonStyle, flex: 1, background: "#1f2f98" }} onClick={() => handleButtonClick('.')}>.</button>
                <button style={{ ...buttonStyle, flex: 2, background: "#32cd32", fontSize: "1.2em" }} onClick={handleEnter}>
                    Start Subnetting
                </button>
                <button style={{ ...buttonStyle, flex: 1, background: "#1f2f98" }} onClick={() => handleButtonClick('/')}>/</button>
            </div>
        </div>

    );
};

export default SubnetCalculator;
