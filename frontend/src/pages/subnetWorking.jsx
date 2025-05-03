import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage.jsx";

const SubnetWorkingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { subnet, CIDR, subnet_mask, ip } = location.state;

    const [workings, setWorkings] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkings = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/subnet-working", {
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
                setWorkings(data.steps);
            } catch (error) {
                alert(`Request failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkings();
    }, [ip, subnet, subnet_mask]);

    const goBack = () => navigate("/");

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                background: "linear-gradient(135deg, #0a192f, #1f2f98)",
                fontFamily: "Orbitron",
                color: "white",
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
                    transition: "0.3s",
                }}
            >
                ← Go Back
            </button>

            <h2 style={{ fontSize: "36px", color: "#ffffff" }}>
                Subnet Working Details
            </h2>

            <div style={{ marginBottom: "20px", fontFamily: "monospace" }}>
                <h3 style={{ color: "#38bdf8" }}>Network Information</h3>
                <p>
                    <strong>IP Address:</strong> {ip}
                </p>
                <p>
                    <strong>CIDR:</strong> {CIDR}
                </p>
                <p>
                    <strong>Subnet Mask:</strong> {subnet_mask}
                </p>
            </div>

            <div>
                <h3 style={{ color: "#38bdf8" }}>Workings</h3>
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div
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
                            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                        }}
                    >
                        {Array.isArray(workings) && workings.map((line, index) => {
                            if (line.trim().startsWith("Step ")) {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            marginTop: "30px",
                                            fontWeight: "bold",
                                            color: "#fcd34d",
                                            fontSize: "18px",
                                            fontFamily: "Orbitron, monospace",
                                            borderBottom: "1px solid #fcd34d",
                                            paddingBottom: "4px",
                                        }}
                                    >
                                        {line.trim()}
                                    </div>
                                );
                            }

                            else if (line.startsWith("→")) {
                                return (
                                    <div key={index} style={{ paddingLeft: "20px", color: "#93c5fd" }}>
                                        {line}
                                    </div>
                                );
                            } else if (line.trim() === "") {
                                return <br key={index} />;
                            } else {
                                return (
                                    <div key={index} style={{ paddingLeft: "10px" }}>
                                        {line}
                                    </div>
                                );
                            }
                        })}
                    </div>

                )}
            </div>
        </div>
    );
};

export default SubnetWorkingPage;
