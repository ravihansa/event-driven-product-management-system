import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const useAlerts = () => {
    const showSuccess = (message, options = {}) => {
        toast.success(message, options);
    };

    const showError = (message, options = {}) => {
        toast.error(message, options);
    };

    return {
        successAlert: showSuccess,
        errorAlert: showError
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
