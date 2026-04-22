"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const limit = 10;
const pagValidator = (page) => {
    const parsedNum = Number(page);
    const verifiedPage = (parsedNum || 1) <= 0 ? 1 : parsedNum;
    const offset = (verifiedPage - 1) * limit;
    return { limit, offset };
};
exports.default = pagValidator;
