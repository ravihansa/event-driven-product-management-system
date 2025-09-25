import eventBus from '../eventBus.js';
import { EventTypes } from '../eventTypes.js';
import { lowStockThreshold } from '../../configs/index.js';


export async function checkLowStock(product) {
    if (product.quantity < lowStockThreshold) {
        const event = {
            type: EventTypes.LOW_STOCK_WARNING,
            payload: { product, threshold: lowStockThreshold },
            timestamp: new Date()
        };
        await eventBus.publish(event);
    }
}

export async function publishProductCreated(product) {
    const event = {
        type: EventTypes.PRODUCT_CREATED,
        payload: product,
        timestamp: new Date()
    };
    await eventBus.publish(event);
    await checkLowStock(product);
}

export async function publishProductUpdated(product) {
    const event = {
        type: EventTypes.PRODUCT_UPDATED,
        payload: product,
        timestamp: new Date()
    };
    await eventBus.publish(event);
    await checkLowStock(product);
}

export async function publishProductDeleted(product) {
    const event = {
        type: EventTypes.PRODUCT_DELETED,
        payload: product,
        timestamp: new Date()
    };
    await eventBus.publish(event);
}
