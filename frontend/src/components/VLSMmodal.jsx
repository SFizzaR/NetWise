import React from 'react';
import { useNavigate } from "react-router-dom";

const Modal = ({ result, onClose, title }) => {
    if (!result) return null;
    const navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: "#1b5e20",
        color: "#66bb6a",
        border: "2px solid #66bb6a",
        padding: "10px 24px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 0 10px #66bb6a, 0 0 20px #66bb6a",
        transition: "all 0.3s ease",
        fontFamily: "Orbitron",
        margin: "0 10px",
    };

    const hoverIn = (e) => {
        e.target.style.backgroundColor = "#66bb6a";
        e.target.style.color = "#1b5e20";
        e.target.style.boxShadow = "0 0 15px #66bb6a, 0 0 30px #66bb6a";
    };

    const hoverOut = (e) => {
        e.target.style.backgroundColor = "#1b5e20";
        e.target.style.color = "#66bb6a";
        e.target.style.boxShadow = "0 0 10px #66bb6a, 0 0 20px #66bb6a";
    }

    const handleShowWorkings = () => {
        const dataToPass = {
            base_network: result.base_network,
            base_ip: result.starting_ip,
            host_requirements: Array.isArray(result.host_requirement)
                ? result.host_requirement
                : String(result.host_requirement).match(/\d+/g).map(Number)
        };
        navigate('/vlsm-working', { state: dataToPass });
    };

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {value.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "5px" }}>
                            {typeof item === "object" ? renderValue(item) : item}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof value === "object" && value !== null) {
            return (
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
                    <tbody>
                        {Object.keys(value).map((subKey) => (
                            <tr key={subKey}>
                                <td
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: "15px",
                                        padding: "6px",
                                        fontWeight: "bold",
                                        textAlign: "left",
                                        verticalAlign: "top",
                                        width: "40%",
                                        borderBottom: "1px solid #3b9a57",
                                    }}
                                >
                                    {subKey.replace(/_/g, " ").toUpperCase()}
                                </td>
                                <td
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: "15px",
                                        padding: "6px",
                                        textAlign: "left",
                                        verticalAlign: "top",
                                        borderBottom: "1px solid #3b9a57",
                                    }}
                                >
                                    {renderValue(value[subKey])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return value;
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: "#1b5e20",
                    padding: "20px",
                    borderRadius: "10px",
                    color: "white",
                    width: "90%",
                    maxWidth: "700px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                }}
            >
                <h3
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: "30px",
                        fontFamily: "Orbitron",
                        color: "#81c784",
                    }}
                >
                    {title || "Details"}
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                        border: "2px solid #66bb6a",
                        borderRadius: "12px",
                        boxShadow: "0 0 15px #66bb6a, 0 0 30px #66bb6a",
                        overflow: "hidden",
                    }}
                >
                    <tbody>
                        {result.subnets.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr style={{ borderBottom: "2px solid #81c784" }}>
                                    <td
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: "17px",
                                            padding: "10px",
                                            fontWeight: "bold",
                                            textAlign: "left",
                                            verticalAlign: "top",
                                            width: "40%",
                                            backgroundColor: "#388e3c",
                                            color: "white",
                                        }}
                                    >
                                        Host Requirement
                                    </td>
                                    <td
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: "16px",
                                            padding: "10px",
                                            textAlign: "left",
                                            verticalAlign: "top",
                                            backgroundColor: "#81c784",
                                        }}
                                    >
                                        {item.hostRequirement}
                                    </td>
                                </tr>

                                {Object.keys(item).map((key) => {
                                    if (key !== "hostRequirement") {
                                        return (
                                            <tr key={key} style={{ borderBottom: "2px solid #81c784" }}>
                                                <td
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "17px",
                                                        padding: "10px",
                                                        fontWeight: "bold",
                                                        textAlign: "left",
                                                        verticalAlign: "top",
                                                        width: "40%",
                                                        backgroundColor: "#388e3c",
                                                        color: "white",
                                                    }}
                                                >
                                                    {key.replace(/_/g, " ").toUpperCase()}
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "16px",
                                                        padding: "10px",
                                                        textAlign: "left",
                                                        verticalAlign: "top",
                                                        backgroundColor: "#c8e6c9",
                                                        color: "#1b5e20",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {renderValue(item[key])}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={onClose}
                        onMouseOver={hoverIn}
                        onMouseOut={hoverOut}
                        style={buttonStyle}
                    >
                        Close
                    </button>
                    <button
                        onClick={handleShowWorkings}
                        onMouseOver={hoverIn}
                        onMouseOut={hoverOut}
                        style={buttonStyle}
                    >
                        Show Working
                    </button>

                    <button
                        onClick={() => navigate('/vlsm-visualizer', { state: { subnets: result.subnets } })}
                        onMouseOver={hoverIn}
                        onMouseOut={hoverOut}
                        style={buttonStyle}
                    >
                        Show Visualization
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Modal;
