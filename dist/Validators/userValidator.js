"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const appError_1 = require("../Classes/appError");
const validateid = (id) => {
    return Number(id);
};
const validatename = (name) => {
    return name.length <= 50 && name.length > 0 && !name === false;
};
const validateage = (age) => {
    return !(age > 130 || age <= 0) && !age === false;
};
const validatebody = (user) => {
    return (typeof user == "object" &&
        !user === false &&
        typeof user.username === "string" &&
        typeof user.age === "number");
};
var userValidator;
(function (userValidator) {
    userValidator.validateUSer = (user) => {
        if (!validatebody(user)) {
            throw new appError_1.AppError(400, "invalid data");
        }
        if (!validatename(user.username)) {
            throw new appError_1.AppError(400, "invalid username");
        }
        if (!validateage(user.age)) {
            throw new appError_1.AppError(400, "invalid age");
        }
        return user;
    };
})(userValidator || (exports.userValidator = userValidator = {}));
