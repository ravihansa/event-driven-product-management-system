import { config } from 'dotenv';
config();

const {
    PORT,
    DATABASE_URL,
} = process.env;

export const port = PORT || 3000;
export const dbUri = DATABASE_URL;
