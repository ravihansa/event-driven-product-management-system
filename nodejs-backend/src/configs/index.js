import { config } from 'dotenv';
config();

const {
    PORT,
    DATABASE_URL,
    LOW_STOCK_THRESHOLD,
} = process.env;

export const port = PORT || 3000;
export const dbUri = DATABASE_URL;
export const lowStockThreshold = LOW_STOCK_THRESHOLD;
