const globalErrorHandler = (err, req, res) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};

module.exports = globalErrorHandler;
