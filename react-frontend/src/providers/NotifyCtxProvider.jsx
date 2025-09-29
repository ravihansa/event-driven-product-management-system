import { createContext, useContext, useState, useEffect } from 'react';
import { useAlerts } from './AlertProvider';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const { customNotification } = useAlerts();

    useEffect(() => {
        const streamUrl = `${process.env.REACT_APP_API_URL}/events/stream/${process.env.REACT_APP_SELLER_ID}`;
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (e) => {
            try {
                const parsed = JSON.parse(e.data);
                if (parsed?.type !== 'CONNECTED') {
                    const eventObj = {
                        type: parsed?.type === 'LOW_STOCK_WARNING' ? 'warning' : 'info',
                        title: parsed?.type?.replace(/_/g, ' '),
                        details: `Product Name: ${parsed?.data?.name ?? parsed?.data?.product?.name}`
                    };
                    setEvents((prev) => [...prev, eventObj]);
                    customNotification(eventObj);
                }
            } catch (err) {
                console.error("Invalid event data", err.message);
            }
        };

        eventSource.onerror = (err) => {
            console.error("Event source error", err.message);
            eventSource.close();
        };

        return () => eventSource.close();

    }, []);

    return (
        <NotificationContext.Provider value={{
            events,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
