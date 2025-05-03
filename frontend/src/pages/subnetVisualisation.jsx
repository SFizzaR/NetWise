import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";

const VisualizationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div style={{
                padding: "40px",
                textAlign: "center",
                color: "#00f0ff",
                fontFamily: "Orbitron, monospace",
                backgroundColor: "#0d1117",
                height: "100vh"
            }}>
                <h2>No subnet data provided.</h2>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        marginTop: "20px",
                        padding: "10px 24px",
                        backgroundColor: "#0d1117",
                        color: "#00f0ff",
                        border: "2px solid #00f0ff",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        fontFamily: "Orbitron, monospace",
                        boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff",
                        cursor: "pointer",
                        transition: "transform 0.2s ease"
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                    Go Back
                </button>
            </div>
        );
    }

    const ipToNum = (ip) => ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
    const numToIp = (num) => [24, 16, 8, 0].map(shift => (num >> shift) & 255).join(".");
    const usableHosts = parseInt(result.usable_hosts);
    const usableIPs = Array.from({ length: usableHosts }, (_, i) => numToIp(ipToNum(result.first_usable) + i));

    return (
        <div style={{
            padding: "40px",
            backgroundColor: "#0d1117",
            color: "#00f0ff",
            fontFamily: "Orbitron, monospace",
            minHeight: "100vh",
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
            <h2 style={{
                fontSize: "32px",
                marginBottom: "30px",
                textAlign: "center",
                textShadow: "0 0 10px #00f0ff"
            }}>
                Subnet Visualization for {result.subnet}
            </h2>

            <div style={{
                border: "2px solid #00f0ff",
                borderRadius: "12px",
                boxShadow: "0 0 15px #00f0ff",
                padding: "10px",
                marginBottom: "30px"
            }}>
                <Plot
                    data={[
                        {
                            x: [result.network],
                            y: [0],
                            type: "scatter",
                            mode: "markers+text",
                            name: "Network IP",
                            marker: { size: 14, color: "#00bcd4", symbol: "circle" },
                            text: [result.network],
                            textposition: "bottom center"
                        },
                        {
                            x: usableIPs,
                            y: Array(usableIPs.length).fill(1),
                            type: "scatter",
                            mode: "markers+text",
                            name: "Usable IPs",
                            marker: { size: 10, color: "#00f0ff" },
                            text: usableIPs,
                            textposition: "top center"
                        },
                        {
                            x: [result.broadcast],
                            y: [2],
                            type: "scatter",
                            mode: "markers+text",
                            name: "Broadcast IP",
                            marker: { size: 14, color: "#e53935", symbol: "diamond" },
                            text: [result.broadcast],
                            textposition: "bottom center"
                        }
                    ]}
                    layout={{
                        title: {
                            text: "IP Address Roles",
                            font: { family: "Orbitron", size: 24, color: "#00f0ff" }
                        },
                        paper_bgcolor: "#0d1117",
                        plot_bgcolor: "#0d1117",
                        xaxis: {
                            title: { text: "IP Addresses", font: { color: "#00f0ff" } },
                            tickangle: -45,
                            color: "#00f0ff"
                        },
                        yaxis: {
                            title: { text: "Type", font: { color: "#00f0ff" } },
                            tickvals: [0, 1, 2],
                            ticktext: ["Network", "Usable", "Broadcast"],
                            color: "#00f0ff"
                        },
                        hovermode: "closest",
                        autosize: true,
                        height: 600,
                        margin: { t: 80 },
                        legend: { orientation: "h", y: -0.2 }
                    }}
                    useResizeHandler
                    style={{ width: "100%", height: "100%" }}
                    config={{ responsive: true }}
                />
            </div>

            <div style={{ textAlign: "center" }}>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "20px",
                        padding: "12px 30px",
                        backgroundColor: "#0d1117",
                        border: "2px solid #00f0ff",
                        color: "#00f0ff",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        fontFamily: "Orbitron, monospace",
                        cursor: "pointer",
                        boxShadow: "0 0 10px #00f0ff",
                        transition: "transform 0.2s ease"
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default VisualizationPage;
