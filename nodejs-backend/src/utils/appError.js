class AppError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode ?? 500;
        this.code = code ?? 'INTERNAL_SERVER_ERROR';
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
