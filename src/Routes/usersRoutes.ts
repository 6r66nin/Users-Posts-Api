import { Router } from "express";
import * as Controller from "../Controllers/usersController";
import idparamHandler from "../Middleware/idparamHandler";


const usersRouter = Router();

usersRouter
  .route("/")
  .get(Controller.getUsers)
  .post(Controller.addUser);

usersRouter.use("/:id", idparamHandler)
usersRouter
  .route("/:id")
  .get(Controller.getUser)
  .delete(Controller.deleteUser)
  .put(Controller.updateUser);


export default usersRouter;
