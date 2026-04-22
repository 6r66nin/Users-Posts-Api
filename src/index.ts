import express from "express";
import errorHandler from "./Middleware/errorHandler";
import postsRouter from "./Routes/postsRoutes";
import usersRouter from "./Routes/usersRoutes";
import { AppError } from "./Classes/appErrors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use((_req, res) => {
  throw new AppError(404, "Page not found");
});

app.use(errorHandler);

app.listen(PORT, () => console.log("Server Running"));
