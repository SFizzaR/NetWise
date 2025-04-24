const Modal = ({ result, onClose }) => {
    if (!result) return null;

    return (
        <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: "#1f2f98",
                padding: "20px",
                borderRadius: "10px",
                color: "white",
                width: "90%",
                maxWidth: "700px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                alignItems: "center",
                alignContent: "center"
            }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px", fontSize: "30px" }}>Subnet Details</h3>

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                    border: "2px solid #00f0ff",
                    borderRadius: "12px",
                    boxShadow: "0 0 15px #00f0ff, 0 0 30px #00f0ff",
                    overflow: "hidden",
                }}>
                    <tbody>
                        <tr>
                            <td><strong>Network Address</strong></td>
                            <td>{result.network}</td>
                        </tr>
                        <tr>
                            <td><strong>IP Class</strong></td>
                            <td>{result.ip_class}</td>
                        </tr>
                        <tr>
                            <td><strong>Subnet Mask</strong></td>
                            <td>{result.subnet_mask}</td>
                        </tr>
                        <tr>
                            <td><strong>CIDR</strong></td>
                            <td>{result.CIDR}</td>
                        </tr>
                        <tr>
                            <td><strong>Broadcast Address</strong></td>
                            <td>{result.broadcast}</td>
                        </tr>
                        <tr>
                            <td><strong>First Usable IP</strong></td>
                            <td>{result.first_usable}</td>
                        </tr>
                        <tr>
                            <td><strong>Last Usable IP</strong></td>
                            <td>{result.last_usable}</td>
                        </tr>
                        <tr>
                            <td><strong>Usable Hosts</strong></td>
                            <td>{result.usable_hosts}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Hosts</strong></td>
                            <td>{result.total_hosts}</td>
                        </tr>
                        <tr>
                            <td><strong>Wildcard Mask</strong></td>
                            <td>{result.wildcard_mask}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    Private/Public
                                </strong>
                            </td>
                            <td> {result.is_private ? "Private" : "Public"}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: "#111",
                            color: "#00f0ff",
                            border: "2px solid #00f0ff",
                            padding: "10px 24px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff",
                            transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#00f0ff";
                            e.target.style.color = "black";
                            e.target.style.boxShadow = "0 0 15px #00f0ff, 0 0 30px #00f0ff";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#111";
                            e.target.style.color = "#00f0ff";
                            e.target.style.boxShadow = "0 0 10px #00f0ff, 0 0 20px #00f0ff";
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
