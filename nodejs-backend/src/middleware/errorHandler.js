import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import AppError from './../utils/appError.js';


export default function errorHandler(err, req, res, next) {
    console.error(err.message);
    if (res.headersSent) { // Check if headers have already been sent
        return next(err); // If so, just pass the error along
    }
    let statusCode = 500;
    let message = err.message ?? 'Internal Server Error';
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    if (err instanceof ZodError) {
        statusCode = 400;
        message = err.issues.map(e => e.message).join(', ');
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        message = `${err.message}, Code: ${err.code}`;
    }

    res.status(statusCode).json({ error: true, message: message });
};
