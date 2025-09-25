import eventBus from '../eventBus.js';
import { EventTypes } from '../eventTypes.js';
import { sendEventToClient } from '../eventService.js';

export const productEventHandlers = () => {
    eventBus.subscribe(EventTypes.LOW_STOCK_WARNING, (event) => {
        const sellerId = event.payload.product?.sellerId ?? null;
        sendEventToClient(sellerId, {
            type: 'LOW_STOCK_WARNING',
            data: event.payload,
            timestamp: event.timestamp
        });
    });

    eventBus.subscribe(EventTypes.PRODUCT_CREATED, (event) => {
        const sellerId = event.payload.sellerId ?? null;
        sendEventToClient(sellerId, {
            type: 'PRODUCT_CREATED',
            data: event.payload,
            timestamp: event.timestamp
        });
    });

    eventBus.subscribe(EventTypes.PRODUCT_UPDATED, (event) => {
        const sellerId = event.payload.sellerId ?? null;
        sendEventToClient(sellerId, {
            type: 'PRODUCT_UPDATED',
            data: event.payload,
            timestamp: event.timestamp
        });
    });

    eventBus.subscribe(EventTypes.PRODUCT_DELETED, (event) => {
        const sellerId = event.payload.sellerId ?? null;
        sendEventToClient(sellerId, {
            type: 'PRODUCT_DELETED',
            data: event.payload,
            timestamp: event.timestamp
        });
    });
}
