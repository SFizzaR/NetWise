import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from "react";
import logo from "../assets/logo.png";
import SubnetModal from "../components/subnetModal.jsx";
import VlsmModal from "../components/VLSMmodal.jsx";
import '../font.css';
import SubnetCalculator from "../components/subnetCalculator.jsx";
import VLSMCalculator from "../components/vlsmCalculator.jsx";
import LoadingPage from "../components/LoadingPage.jsx";

export default function Home() {
    const [init, setInit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [showTitle, setShowTitle] = useState(window.innerWidth > 768);
    const [showvlsm, setvlsm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowTitle(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(() => ({
        background: {
            image: "linear-gradient(135deg, black,  #0a192f, #1f2f98)",
            fullScreen: { enable: true }
        },
        fullScreen: { enable: true },
        particles: {
            number: { value: 80, density: { enable: true, area: 1000 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.8,
                animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false }
            },
            size: { value: 5, random: true },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.5,
                width: 1.5,
                shadow: { enable: true, color: "#ffffff", blur: 10 }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" }
            },
            shadow: { enable: true, color: "#ffffff", blur: 10 }
        },
        detectRetina: true,
    }), []);

    const handleMode = () => {
        setvlsm(prev => !prev);
    };


    if (!init) return null;

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <div
                    style={{
                        position: "relative",
                        width: "100vw",
                        height: "100vh"
                    }}
                >
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {showTitle && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "65%",
                                    left: "5%",
                                    padding: "1em",
                                    textAlign: "center",
                                    width: "min(80vw, 300px)",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    <img
                                        src={logo}
                                        width="24%"
                                        height="24%"
                                        style={{ marginRight: "5px" }}
                                        alt="NetWise Logo"
                                    />
                                    <h1
                                        style={{
                                            fontSize: "2.5em",
                                            color: "#ffff",
                                            marginBottom: "2px",
                                            fontFamily: "Orbitron"
                                        }}
                                    >
                                        NetWise
                                    </h1>
                                </div>
                                <h3
                                    style={{
                                        color: "#ffff",
                                        fontFamily: "monospace",
                                        fontSize: "17px"
                                    }}
                                >
                                    Smart Subnet Calculator
                                </h3>
                                <button
                                    style={{
                                        fontFamily: "Orbitron",
                                        backgroundColor: showvlsm ? "#3b82f6" : "#22c55e",
                                        color: "white",
                                        padding: "12px 20px",
                                        fontSize: "1em",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        marginTop: "10px",
                                        fontWeight: "bold",
                                        boxShadow: showvlsm
                                            ? "0 0 10px rgba(0, 153, 255, 0.6)"
                                            : "0 0 10px #14b8a6",
                                        transition: "all 0.3s ease"
                                    }}
                                    onClick={handleMode}
                                >
                                    {showvlsm ? "Switch to Subnet Calculator" : "Switch to VLSM Calculator"}
                                </button>
                            </div>
                        )}
                        <div>
                            {showvlsm ? (
                                <VLSMCalculator
                                    setResultData={setResultData}
                                    setModalVisible={setModalVisible}
                                    setLoading={setLoading}
                                />
                            ) : (
                                <SubnetCalculator
                                    setResultData={setResultData}
                                    setModalVisible={setModalVisible}
                                    setLoading={setLoading}
                                />

                            )}
                        </div>
                    </div>

                    {/* MODALS */}
                    {modalVisible && (
                        showvlsm ? (
                            <VlsmModal
                                result={resultData}
                                title="VLSM Details"
                                onClose={() => setModalVisible(false)}
                            />
                        ) : (
                            <SubnetModal
                                result={resultData}
                                title="Subnet Details"
                                onClose={() => setModalVisible(false)}
                            />
                        )
                    )}

                </div>
            )}
        </>
    );
}
