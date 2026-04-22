"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appErrors_1 = require("../Classes/appErrors");
const errorHandler = (err, req, res, _next) => {
    console.log(err);
    const errstatus = err instanceof appErrors_1.AppError ? err.statusCode : 500;
    const errmessage = err instanceof appErrors_1.AppError ? err.message : "Internal server error";
    res.status(errstatus).json({ error: errmessage });
};
exports.default = errorHandler;
