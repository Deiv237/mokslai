const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode = err.statusCode || 500;
    const errStatus = err.status = err.status || 'error';
    const errMesage = err.message || 'Something went wrong';

    res.status(statusCode).json({
        status: errStatus,
        message: errMesage
    });
};

module.exports = errorHandler;