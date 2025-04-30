import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";

const VisualizationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
                <h2>No subnet data provided.</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const ipToNum = (ip) => ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
    const numToIp = (num) => [24, 16, 8, 0].map(shift => (num >> shift) & 255).join(".");

    const usableHosts = parseInt(result.usable_hosts);
    const usableIPs = Array.from({ length: usableHosts }, (_, i) => numToIp(ipToNum(result.first_usable) + i));

    return (
        <div style={{ padding: "40px", backgroundColor: "#0a0a0a", color: "#fff" }}>
            <h2 style={{ color: "#00f0ff" }}>
                Subnet Visualization for {result.subnet}
            </h2>

            <Plot
                data={[
                    {
                        x: [result.network],
                        y: [0],
                        type: "scatter",
                        mode: "markers+text",
                        name: "Network IP",
                        marker: { size: 14, color: "blue", symbol: "circle" },
                        text: [result.network],
                        textposition: "bottom center"
                    },
                    {
                        x: usableIPs,
                        y: Array(usableIPs.length).fill(1),
                        type: "scatter",
                        mode: "markers+text",
                        name: "Usable IPs",
                        marker: { size: 10, color: "green" },
                        text: usableIPs,
                        textposition: "top center"
                    },
                    {
                        x: [result.broadcast],
                        y: [2],
                        type: "scatter",
                        mode: "markers+text",
                        name: "Broadcast IP",
                        marker: { size: 14, color: "red", symbol: "diamond" },
                        text: [result.broadcast],
                        textposition: "bottom center"
                    }
                ]}
                layout={{
                    title: "IP Address Roles",
                    xaxis: {
                        title: "IP Addresses",
                        tickangle: -45,
                    },
                    yaxis: {
                        title: "Type",
                        tickvals: [0, 1, 2],
                        ticktext: ["Network", "Usable", "Broadcast"],
                    },
                    hovermode: "closest",
                    autosize: true,
                    height: 600,
                    margin: { t: 80 },
                    legend: {
                        orientation: "h",
                        y: -0.2
                    }
                }}
                useResizeHandler
                style={{ width: "100%", height: "100%" }}
                config={{ responsive: true }}
            />

            <button
                onClick={() => { navigate("/") }}
                style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#00f0ff", border: "none", color: "#000", fontWeight: "bold", borderRadius: "4px" }}
            >
                Return to Home
            </button>
        </div>
    );
};

export default VisualizationPage;
