"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const appErrors_1 = require("../Classes/appErrors");
var userValidator;
(function (userValidator) {
    const validateName = (name) => {
        name = name.trim();
        return name.length <= 50 && name.length > 0;
    };
    const validateAge = (age) => {
        return !(age > 130 || age <= 0);
    };
    const isUser = (user) => {
        return (typeof user == "object" &&
            user != null &&
            typeof user.username === "string" &&
            typeof user.age === "number");
    };
    userValidator.validateUser = (user) => {
        if (!isUser(user)) {
            throw new appErrors_1.AppError(400, "invalid data");
        }
        if (!validateName(user.username)) {
            throw new appErrors_1.AppError(400, "invalid username");
        }
        if (!validateAge(user.age)) {
            throw new appErrors_1.AppError(400, "invalid age");
        }
        return user;
    };
})(userValidator || (exports.userValidator = userValidator = {}));
