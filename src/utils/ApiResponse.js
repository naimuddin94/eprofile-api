class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        if (statusCode > 300) {
            this.error = message;
        } else {
            this.message = message;
            this.data = data;
        }
        this.success = statusCode < 400;
    }
}

module.exports = { ApiResponse };
