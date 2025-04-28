import React from 'react';

const Modal = ({ result, onClose, title }) => {
    if (!result) return null;

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <ul
                    style={{
                        listStyle: "none",
                        paddingLeft: 0,
                    }}
                >
                    {value.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "5px" }}>
                            {typeof item === "object" ? renderValue(item) : item}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof value === "object" && value !== null) {
            return (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "10px",
                    }}
                >
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
                                        borderBottom: "1px solid #3b9a57", // Green border
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
                                        borderBottom: "1px solid #3b9a57", // Green border
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
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background for contrast
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: "#1b5e20", // Dark green background
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
                        color: "#81c784", // Light green for title
                    }}
                >
                    {title || "Details"}
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                        border: "2px solid #66bb6a", // Light green border
                        borderRadius: "12px",
                        boxShadow: "0 0 15px #66bb6a, 0 0 30px #66bb6a", // Green glow
                        overflow: "hidden",
                    }}
                >
                    <tbody>
                        {/* Loop through the result and ensure hostRequirement is displayed first */}
                        {result.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr style={{ borderBottom: "2px solid #81c784" }}> {/* Green line separator */}
                                    <td
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: "17px",
                                            padding: "10px",
                                            fontWeight: "bold",
                                            textAlign: "left",
                                            verticalAlign: "top",
                                            width: "40%",
                                            backgroundColor: "#388e3c", // Dark green background for the row
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
                                            backgroundColor: "#81c784", // Light green for host requirement value
                                        }}
                                    >
                                        {item.hostRequirement}
                                    </td>
                                </tr>

                                {/* Render other fields */}
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
                                                        backgroundColor: "#c8e6c9", // Lighter green for the values
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

                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: "#1b5e20", // Dark green button
                        color: "#66bb6a", // Light green text
                        border: "2px solid #66bb6a",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 0 10px #66bb6a, 0 0 20px #66bb6a",
                        transition: "all 0.3s ease",
                        fontFamily: "Orbitron",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#66bb6a"; // Change to light green on hover
                        e.target.style.color = "#1b5e20"; // Dark green text on hover
                        e.target.style.boxShadow = "0 0 15px #66bb6a, 0 0 30px #66bb6a";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#1b5e20";
                        e.target.style.color = "#66bb6a";
                        e.target.style.boxShadow = "0 0 10px #66bb6a, 0 0 20px #66bb6a";
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
