"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagValidator = (page) => {
    const parsedNum = Number(page);
    const verifiedLimit = (parsedNum || 1) <= 0 ? 1 : parsedNum;
    return verifiedLimit;
};
