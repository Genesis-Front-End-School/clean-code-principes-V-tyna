"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwAnErrorHandler = (resp, msg) => {
    const e = new Error(msg);
    e.status = resp.status;
    e.statusText = resp.statusText;
    e.success = false;
    throw e;
};
exports.default = throwAnErrorHandler;
