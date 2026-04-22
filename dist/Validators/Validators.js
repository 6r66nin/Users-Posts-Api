"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidator = exports.userValidator = exports.validateId = void 0;
const appError_1 = require("../Classes/appError");
const validateId = (id) => {
    const parsedID = Number(id);
    return !(isNaN(parsedID) || parsedID <= 0);
};
exports.validateId = validateId;
const validateName = (name) => {
    return name.length <= 50 && name.length > 0;
};
const validateAge = (age) => {
    return !(age > 130 || age <= 0);
};
const validateBody = (user) => {
    return (typeof user == "object" &&
        user != null &&
        typeof user.username === "string" &&
        typeof user.age === "number");
};
var userValidator;
(function (userValidator) {
    userValidator.validateUser = (user) => {
        if (!validateBody(user)) {
            throw new appError_1.AppError(400, "invalid data");
        }
        if (!validateName(user.username)) {
            throw new appError_1.AppError(400, "invalid username");
        }
        if (!validateAge(user.age)) {
            throw new appError_1.AppError(400, "invalid age");
        }
        return user;
    };
})(userValidator || (exports.userValidator = userValidator = {}));
var postValidator;
(function (postValidator) {
    postValidator.validateUser = (user) => {
        if (!validateBody(user)) {
            throw new appError_1.AppError(400, "invalid data");
        }
        if (!validateName(user.username)) {
            throw new appError_1.AppError(400, "invalid username");
        }
        if (!validateAge(user.age)) {
            throw new appError_1.AppError(400, "invalid age");
        }
        return user;
    };
})(postValidator || (exports.postValidator = postValidator = {}));
