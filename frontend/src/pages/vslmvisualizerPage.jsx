import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VlsmVisualizer from "../components/vlsmVisulalizer"

const VlsmVisualizerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subnets = location.state?.subnets || [];

    return (
        <div style={{ padding: "40px", backgroundColor: "#0a192f", minHeight: "100vh", color: "white", fontFamily: "Orbitron" }}>
            <button
                onClick={() => navigate(-1)}
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
                    marginBottom: "30px"
                }}
            >
                ← Back
            </button>

            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>VLSM Subnet Visualizer</h2>

            <VlsmVisualizer subnets={subnets} />
        </div>
    );
};

export default VlsmVisualizerPage;
