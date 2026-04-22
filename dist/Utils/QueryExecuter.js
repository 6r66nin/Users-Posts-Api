"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../Config/pool"));
const appErrors_1 = require("../Classes/appErrors");
const queryExc = async (contextMessage, query, queryparams = [], oneItem) => {
    try {
        const result = await pool_1.default.query(query, queryparams);
        return (oneItem ? result.rows[0] || null : result.rows);
    }
    catch (error) {
        throw new appErrors_1.DatabaseError(error.code, contextMessage);
    }
};
exports.default = queryExc;
