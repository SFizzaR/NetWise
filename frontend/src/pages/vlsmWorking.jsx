import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage.jsx";

const VlsmWorkingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { base_network, base_ip, host_requirements } = location.state;
    const formattedHosts = typeof host_requirements === "string"
        ? host_requirements.split(',').map(h => parseInt(h.trim()))
        : host_requirements;

    const [workings, setWorkings] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkings = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/vlsm-working", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        base_network,
                        base_ip,
                        host_requirements: formattedHosts
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json();
                    alert(`Error: ${errData.error || "Unknown error occurred."}`);
                    return;
                }

                const data = await response.json();
                setWorkings(data);
            } catch (error) {
                alert(`Request failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkings();
    }, [base_network, base_ip, formattedHosts]);

    const goBack = () => navigate("/");

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                background: "linear-gradient(135deg, #0a192f, #1f2f98)",
                fontFamily: "Orbitron",
                color: "white"
            }}
        >
            <button
                onClick={goBack}
                style={{
                    backgroundColor: "#22c55e",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    boxShadow: "0 0 10px #14b8a6",
                    cursor: "pointer",
                    marginBottom: "30px",
                    transition: "0.3s"
                }}
            >
                ← Go Back
            </button>

            <h2 style={{ fontSize: "36px", color: "#ffffff" }}>Subnet Working Details</h2>

            <div style={{ marginBottom: "20px", fontFamily: "monospace" }}>
                <h3 style={{ color: "#38bdf8" }}>Network Information</h3>
                <p><strong>IP Address:</strong> {base_ip}</p>
                <p><strong>Network IP:</strong> {base_network}</p>
                <p><strong>Host Requirements:</strong> {location.state.host_requirements.join(", ")}</p>
            </div>

            <div>
                <h3 style={{ color: "#38bdf8" }}>Workings</h3>
                {loading ? (
                    <LoadingPage />
                ) : (
                    Array.isArray(workings.steps) ? (
                        workings.steps.map((line, index) => {
                            const trimmed = line.trim();
                            if (trimmed.startsWith("Subnet")) {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            marginTop: "30px",
                                            fontWeight: "bold",
                                            color: "#fcd34d",  // Yellow for subnet steps
                                            fontSize: "18px",
                                            fontFamily: "Orbitron, monospace",
                                            borderBottom: "1px solid #fcd34d", // Bottom border for visual separation
                                            paddingBottom: "4px",
                                        }}
                                    >
                                        {trimmed}
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            paddingLeft: "10px",
                                            fontSize: "14px",
                                            color: "#d1d5db",
                                            fontFamily: "monospace",
                                            marginTop: "5px",
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        {trimmed}
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <pre
                            style={{
                                background: "linear-gradient(145deg, #1f2f98, #2b3b5f)",
                                color: "#d1d5db",
                                padding: "20px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                fontFamily: "monospace",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
                            }}
                        >
                            {workings.steps}
                        </pre>
                    )
                )}
            </div>
        </div>
    );
};

export default VlsmWorkingPage;
