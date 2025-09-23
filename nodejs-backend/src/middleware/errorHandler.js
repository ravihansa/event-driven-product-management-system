export default function errorHandler(err, req, res, next) {
    console.error(err.message);
    if (res.headersSent) { // Check if headers have already been sent
        return next(err); // If so, just pass the error along
    }
    res.status(err.statusCode ?? 500).json({ error: true, message: err.message ?? 'Internal Server Error' });
};
