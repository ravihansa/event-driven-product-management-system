import AppError from './../utils/appError.js';
import { productEventHandlers } from './subscribers/productEventSubscriber.js';

const clients = new Map();

export const eventStream = (req, res, next) => {
    const clientId = Number(req.params.userId);
    if (!clientId) {
        return next(new AppError('Authentication required', 'UNAUTHORIZED', 401));
    }

    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Send initial connection event
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Event stream connected' })}\n\n`);

    // Store the response object for this client
    clients.set(clientId, res);

    // Remove client on connection close
    req.on('close', () => {
        clients.delete(clientId);
        console.log(`Client disconnected: ${clientId}`);
    });

    console.log(`Client connected to event stream: ${clientId}`);
};

// Send events to specific client
export const sendEventToClient = (clientId, event) => {
    const client = clients.get(clientId);
    if (client && !client.finished) {
        client.write(`data: ${JSON.stringify(event)}\n\n`);
    }
};

// Clean up disconnected clients periodically
setInterval(() => {
    clients.forEach((res, clientId) => {
        if (res.finished || res.destroyed) {
            clients.delete(clientId);
        }
    });
}, 30000);

productEventHandlers();
