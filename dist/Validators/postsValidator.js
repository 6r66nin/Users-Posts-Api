"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidator = void 0;
const appErrors_1 = require("../Classes/appErrors");
const utilsValidators_1 = require("./utilsValidators");
var postValidator;
(function (postValidator) {
    const validateContent = (cont) => {
        return cont.trim().length > 0;
    };
    const isPost = (post) => {
        return (typeof post == "object" &&
            post != null &&
            typeof post.user_id === "number" &&
            typeof post.content === "string");
    };
    const iseditPost = (post) => {
        return (typeof post == "object" &&
            post != null &&
            typeof post.content === "string");
    };
    postValidator.validatePost = (post) => {
        if (!isPost(post)) {
            throw new appErrors_1.AppError(400, "Invalid Data");
        }
        if (!(0, utilsValidators_1.validateId)(post.user_id)) {
            throw new appErrors_1.AppError(400, "Invalid user ID");
        }
        if (!validateContent(post.content)) {
            throw new appErrors_1.AppError(400, "Content is empty");
        }
        return post;
    };
    postValidator.validateEditpost = (post) => {
        if (!iseditPost(post)) {
            throw new appErrors_1.AppError(400, "Invalid Data");
        }
        if (!validateContent(post.content)) {
            throw new appErrors_1.AppError(400, "Content is empty");
        }
        return post;
    };
})(postValidator || (exports.postValidator = postValidator = {}));
