"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.addUser = void 0;
const QueryExecuter_1 = __importDefault(require("../Utils/QueryExecuter"));
const appErrors_1 = require("../Classes/appErrors");
const contextMessage = "user";
const addUser = async (user) => {
    const query = "INSERT INTO users (username, age) VALUES ($1, $2) RETURNING username, age";
    const params = [user.username, user.age];
    return await (0, QueryExecuter_1.default)(contextMessage, query, params, true);
};
exports.addUser = addUser;
const getUsers = async (limit, offset) => {
    const query = "SELECT * FROM users LIMIT $1 OFFSET $2";
    const params = [limit, offset];
    const rows = await (0, QueryExecuter_1.default)(contextMessage, query, params);
    if (rows.length === 0) {
        throw new appErrors_1.AppError(404, "Without users.");
    }
    return rows;
};
exports.getUsers = getUsers;
const getUser = async (id) => {
    const query = "SELECT username, age FROM users WHERE id = $1";
    const queryparams = [id];
    const user = await (0, QueryExecuter_1.default)(contextMessage, query, queryparams, true);
    if (!user) {
        throw new appErrors_1.AppError(404, "User not found.");
    }
    return user;
};
exports.getUser = getUser;
const deleteUser = async (id) => {
    const query = "DELETE FROM users WHERE id = $1 RETURNING username, age";
    const params = [id];
    const deletedUser = await (0, QueryExecuter_1.default)(contextMessage, query, params, true);
    if (!deletedUser) {
        throw new appErrors_1.AppError(404, "User not Found");
    }
    return deletedUser;
};
exports.deleteUser = deleteUser;
const updateUser = async (id, data) => {
    const query = "UPDATE users SET username = $1, age = $2 WHERE id = $3 RETURNING username, age";
    const queryparams = [data.username, data.age, id];
    const updatedUser = await (0, QueryExecuter_1.default)(contextMessage, query, queryparams, true);
    if (!updatedUser) {
        throw new appErrors_1.AppError(404, "User not Found");
    }
    return updatedUser;
};
exports.updateUser = updateUser;
