"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appErrors_1 = require("../Classes/appErrors");
const utilsValidators_1 = require("../Validators/utilsValidators");
exports.default = (req, res, next) => {
    const { id } = req.params;
    if ((0, utilsValidators_1.validateId)(id)) {
        return next();
    }
    next(new appErrors_1.AppError(400, "invalid id param"));
};
