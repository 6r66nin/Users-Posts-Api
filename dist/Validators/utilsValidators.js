"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const validateId = (id) => {
    const parsedID = Number(id);
    return !(isNaN(parsedID) || parsedID <= 0);
};
exports.validateId = validateId;
