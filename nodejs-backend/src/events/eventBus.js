import { EventEmitter } from 'events';


class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(100); // Allow multiple subscribers
    }

    async publish(event) {
        this.emit(event.type, event);
        console.info(`Event published: ${event.type}`);
    }

    subscribe(eventType, handler) {
        this.on(eventType, handler);
        console.info(`Subscribed to event: ${eventType}`);
    }

    unsubscribe(eventType, handler) {
        this.off(eventType, handler);
    }
}

// Singleton instance
const eventBus = new EventBus();
export default eventBus;
