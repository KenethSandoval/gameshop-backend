"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const statusResponses = {
    200: 'OK!',
    201: 'CREATED!',
    400: 'CLIENT ERROR!',
    404: 'NOT FOUND!',
    401: 'UNAUTHORIZED',
    500: 'INTERNAL SERVER ERROR'
};
const success = (response, data, statusCode) => {
    response.status(statusCode).json({
        message: statusResponses[statusCode],
        data,
        status: statusCode
    });
};
exports.success = success;
const error = (response, msg, statusCode) => {
    response.status(statusCode).json({
        messageStatus: statusResponses[statusCode],
        msg,
        status: statusCode
    });
};
exports.error = error;
