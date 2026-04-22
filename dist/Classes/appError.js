"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.AppError = void 0;
const databaserrorsMap_1 = require("../Utils/databaserrorsMap");
class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class DatabaseError extends AppError {
    constructor(errcode, messagetype) {
        const respMap = databaserrorsMap_1.errorMap[Number(errcode)];
        const httpResp = respMap?.[messagetype];
        if (respMap !== undefined && httpResp !== undefined) {
            super(httpResp.statusCode, httpResp.message);
            return;
        }
        super(400, "internal error");
    }
}
exports.DatabaseError = DatabaseError;
