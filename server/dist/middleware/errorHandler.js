"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong.';
    res
        .status(errStatus)
        .json({ success: false, status: errStatus, statusText: errMsg });
};
exports.errorHandler = errorHandler;
