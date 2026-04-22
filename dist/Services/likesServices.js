"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.addLike = exports.getLikesfromPost = void 0;
const QueryExecuter_1 = __importDefault(require("../Utils/QueryExecuter"));
const appErrors_1 = require("../Classes/appErrors");
const contextmessage = "like";
const getLikesfromPost = async (id) => {
    const query = "SELECT username as user, likes.created_at FROM likes INNER JOIN users ON likes.user_id = users.id WHERE post_id = $1 ";
    const queryparam = [id];
    const likes = await (0, QueryExecuter_1.default)(contextmessage, query, queryparam);
    if (!likes.length) {
        throw new appErrors_1.AppError(404, "Post without likes");
    }
    return likes;
};
exports.getLikesfromPost = getLikesfromPost;
const addLike = async (postId, userId) => {
    const query = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *";
    const queryparams = [userId, postId];
    const like = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    if (!like) {
        throw new appErrors_1.AppError(404, "Post or User not exist");
    }
    return like;
};
exports.addLike = addLike;
const deleteLike = async (userId, postId) => {
    const query = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *";
    const queryparams = [userId, postId];
    const deletedLike = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    if (!deletedLike) {
        throw new appErrors_1.AppError(404, "Post or User not exist");
    }
    return deletedLike;
};
exports.deleteLike = deleteLike;
