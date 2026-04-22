"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.addLike = exports.getLikes = exports.editPost = exports.deletePost = exports.getPost = exports.getPosts = exports.addPost = void 0;
const postsValidator_1 = require("../Validators/postsValidator");
const Services = __importStar(require("../Services/postsServices"));
const appErrors_1 = require("../Classes/appErrors");
const utilsValidators_1 = require("../Validators/utilsValidators");
const LikeServices = __importStar(require("../Services/likesServices"));
const addPost = async (req, res) => {
    const newPost = postsValidator_1.postValidator.validatePost(req.body);
    const addedPost = await Services.addPost(newPost);
    res.json(addedPost);
};
exports.addPost = addPost;
const getPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const posts = await Services.getPosts(limit, offset);
    res.json(posts);
};
exports.getPosts = getPosts;
const getPost = async (req, res) => {
    const id = Number(req.params.id);
    const post = await Services.getPost(id);
    res.json(post);
};
exports.getPost = getPost;
const deletePost = async (req, res) => {
    const id = Number(req.params.id);
    const deletedPost = await Services.deletePost(id);
    res.json(deletedPost);
};
exports.deletePost = deletePost;
const editPost = async (req, res) => {
    const id = Number(req.params.id);
    const verifiedPost = postsValidator_1.postValidator.validateEditpost(req.body);
    const editedPost = await Services.editPost(id, verifiedPost.content);
    res.json(editedPost);
};
exports.editPost = editPost;
const getLikes = async (req, res) => {
    const id = Number(req.params.id);
    const likes = await LikeServices.getLikesfromPost(id);
    res.json({
        likescount: likes.length,
        likes,
    });
};
exports.getLikes = getLikes;
const addLike = async (req, res) => {
    const id = Number(req.params.id);
    const { userId } = req.body;
    if (!userId || !(0, utilsValidators_1.validateId)(userId)) {
        throw new appErrors_1.AppError(400, "Invalid user id");
    }
    const like = await LikeServices.addLike(id, userId);
    res.json(like);
};
exports.addLike = addLike;
const deleteLike = async (req, res) => {
    const id = Number(req.params.id);
    const { userId } = req.body;
    if (!userId || !(0, utilsValidators_1.validateId)(userId)) {
        throw new appErrors_1.AppError(400, "Invalid user id");
    }
    const deletedlike = await LikeServices.deleteLike(userId, id);
    res.json({ message: "Like removed", deletedlike });
};
exports.deleteLike = deleteLike;
