import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const useAlerts = () => {
    const showSuccess = (message, options = {}) => {
        toast.success(message, options);
    };

    const showError = (message, options = {}) => {
        toast.error(message, options);
    };

    const customNotification = ({ type = "info", title, details }) => {
        toast.custom((t) => (
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    background:
                        type === "success" ? "#079D68"
                            : type === "error" ? "#C90808"
                                : type === "warning" ? "#A3A300"
                                    : "#696969",
                    color: "#fff",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    width: "350px",
                    height: "75px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
            >
                <div>
                    <strong style={{ display: "block", marginBottom: "4px" }}>
                        {title}
                    </strong>
                    <span style={{ fontSize: "13px" }}>{details}</span>
                </div>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                        marginLeft: "12px",
                        background: type === "info" ? "#3B3B3B"
                            : type === "warning" ? "#757500"
                                : "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Dismiss
                </button>
            </div>
        ));
    };

    return {
        successAlert: showSuccess,
        errorAlert: showError,
        customNotification,
    };
};

const AlertProvider = ({ children }) => {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontSize: '14px',
                        maxWidth: '500px',
                        padding: '10px 16px',
                    },
                    success: {
                        style: {
                            background: '#079D68',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#4caf50',
                        },
                    },
                    error: {
                        style: {
                            background: '#C90808',
                            color: '#fff',
                        },
                    },
                }}
            />
            {children}
        </>
    );
};

export default AlertProvider;
