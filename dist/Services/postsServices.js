"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.deletePost = exports.getPost = exports.getPosts = exports.addPost = void 0;
const appErrors_1 = require("../Classes/appErrors");
const QueryExecuter_1 = __importDefault(require("../Utils/QueryExecuter"));
const contextmessage = "post";
const addPost = async (post) => {
    const query = "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING user_id, content";
    const queryparams = [post.user_id, post.content];
    const addedPost = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    return addedPost;
};
exports.addPost = addPost;
const getPosts = async (limit, offset) => {
    const query = "SELECT * FROM posts LIMIT $1 OFFSET $2";
    const queryparams = [limit, offset];
    const posts = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams);
    if (!posts.length) {
        throw new appErrors_1.AppError(404, "There are not posts");
    }
    return posts;
};
exports.getPosts = getPosts;
const getPost = async (id) => {
    const query = "SELECT user_id, content, created_at FROM posts WHERE id = $1";
    const queryparams = [id];
    const post = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    if (!post) {
        throw new appErrors_1.AppError(404, "Post not found");
    }
    return post;
};
exports.getPost = getPost;
const deletePost = async (id) => {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING user_id, content";
    const queryparams = [id];
    const deletedPost = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    if (!deletedPost) {
        throw new appErrors_1.AppError(404, "Not found, post not removed");
    }
    return deletedPost;
};
exports.deletePost = deletePost;
const editPost = async (id, postcontent) => {
    const query = "UPDATE posts SET content = $1 WHERE id = $2 RETURNING *";
    const queryparams = [postcontent, id];
    const editedPost = await (0, QueryExecuter_1.default)(contextmessage, query, queryparams, true);
    if (!editedPost) {
        throw new appErrors_1.AppError(404, "Post not found");
    }
    return editedPost;
};
exports.editPost = editPost;
