/* eslint-disable no-unused-vars */
const globalErrorHandler = (err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};

module.exports = globalErrorHandler;
