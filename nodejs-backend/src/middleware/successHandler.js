export default function successHandler(req, res, next) {
    let error = true;
    let statusCode = 404;
    if (res.locals?.statusCode) {
        error = false;
        statusCode = res.locals.statusCode;
    }
    return res.status(statusCode).send({ error: error, message: '', data: res.locals.data });
};
