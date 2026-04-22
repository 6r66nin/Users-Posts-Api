import { Request, Response } from "express";
import { postValidator } from "../Validators/postsValidator";
import * as Services from "../Services/postsServices";
import { AppError } from "../Classes/appErrors";
import { validateId } from "../Validators/utilsValidators";
import * as LikeServices from "../Services/likesServices";

export const addPost = async (req: Request, res: Response): Promise<void> => {
  const newPost = postValidator.validatePost(req.body);

  const addedPost = await Services.addPost(newPost);

  res.json(addedPost);
};

export const getPosts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const posts = await Services.getPosts(limit, offset);

  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const post = await Services.getPost(id);

  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const deletedPost = await Services.deletePost(id);

  res.json(deletedPost);
};

export const editPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const verifiedPost = postValidator.validateEditpost(req.body);

  const editedPost = await Services.editPost(id, verifiedPost.content);

  res.json(editedPost);
};

export const getLikes = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const likes = await LikeServices.getLikesfromPost(id);

  res.json({
    likescount: likes!.length,
    likes,
  });
};

export const addLike = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { userId } = req.body;

  if (!userId || !validateId(userId)) {
    throw new AppError(400, "Invalid user id");
  }

  const like = await LikeServices.addLike(id, userId);

  res.json(like);
};

export const deleteLike = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { userId } = req.body;

  if (!userId || !validateId(userId)) {
    throw new AppError(400, "Invalid user id");
  }

  const deletedlike = await LikeServices.deleteLike(userId, id);

  res.json({ message: "Like removed", deletedlike });
};
