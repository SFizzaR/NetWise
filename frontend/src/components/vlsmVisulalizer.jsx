import React from 'react';

const VlsmVisualizer = ({ subnets }) => {
    const maxHosts = Math.max(...subnets.map(subnet => subnet.usable_hosts));

    return (
        <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: "#38bdf8" }}>VLSM Visualizer (Bar Graph)</h3>

            {subnets.map((subnet, index) => {
                const barWidth = (subnet.usable_hosts / maxHosts) * 100;  // Bar width is proportional to usable hosts
                return (
                    <div key={index} style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#1f2f98", borderRadius: "8px" }}>
                        <div style={{ fontSize: '18px', color: "#fcd34d", fontWeight: 'bold' }}>
                            Subnet {index + 1}: {subnet.subnet}
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <div
                                style={{
                                    height: "30px",
                                    width: `${barWidth}%`,
                                    backgroundColor: "#22c55e",
                                    borderRadius: "10px"
                                }}
                            />
                            <div style={{ fontSize: '14px', color: "#d1d5db", marginTop: "5px" }}>
                                Usable Hosts: {subnet.usable_hosts}
                            </div>
                        </div>

                        <div style={{ marginTop: "10px", color: "#d1d5db" }}>
                            <strong>Range:</strong> {subnet.first_usable} - {subnet.last_usable}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VlsmVisualizer;
