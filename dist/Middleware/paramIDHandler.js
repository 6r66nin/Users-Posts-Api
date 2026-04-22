"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../Classes/appError");
const Validators_1 = require("../Validators/Validators");
exports.default = (req, res, next) => {
    const { id } = req.params;
    if ((0, Validators_1.validateId)(id)) {
        next();
    }
    next(new appError_1.AppError(400, "invalid id param"));
};
