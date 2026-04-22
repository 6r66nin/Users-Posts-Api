import { Router } from "express";
import idparamHandler from "../Middleware/idparamHandler";
import * as Controller from "../Controllers/postsController";

const postsRouter = Router();

postsRouter.route("/").get(Controller.getPosts).post(Controller.addPost);

postsRouter.use("/:id", idparamHandler);
postsRouter
  .route("/:id")
  .get(Controller.getPost)
  .delete(Controller.deletePost)
  .patch(Controller.editPost);

postsRouter
  .route("/:id/likes")
  .get(Controller.getLikes)
  .post(Controller.addLike)
  .delete(Controller.deleteLike);

export default postsRouter;
