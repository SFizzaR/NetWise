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
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                color: "black",
                width: "90%",
                maxWidth: "700px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
            }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Subnet Details</h3>

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px"
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
                            backgroundColor: "#32cd32",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px"
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
