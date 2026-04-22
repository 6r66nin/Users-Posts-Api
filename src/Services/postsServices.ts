import { AppError } from "../Classes/appErrors";
import { Postcreate } from "../Types/Post";
import queryExc from "../Utils/QueryExecuter";

const contextmessage = "post";

export const addPost = async (post: Postcreate): Promise<Postcreate> => {
  const query =
    "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING user_id, content";
  const queryparams = [post.user_id, post.content];

  const addedPost = await queryExc<Postcreate>(
    contextmessage,
    query,
    queryparams,
    true,
  );

  return addedPost;
};

export const getPosts = async (
  limit: number,
  offset: number,
): Promise<Postcreate[]> => {
  const query = "SELECT * FROM posts LIMIT $1 OFFSET $2";
  const queryparams = [limit, offset];

  const posts = await queryExc<Postcreate[]>(
    contextmessage,
    query,
    queryparams,
  );

  if (!posts.length) {
    throw new AppError(404, "There are not posts");
  }

  return posts;
};

export const getPost = async (id: number): Promise<Postcreate> => {
  const query = "SELECT user_id, content, created_at FROM posts WHERE id = $1";
  const queryparams = [id];

  const post = await queryExc<Postcreate>(
    contextmessage,
    query,
    queryparams,
    true,
  );

  if (!post) {
    throw new AppError(404,"Post not found");
    
  }

  return post;
};

export const deletePost = async (id: number): Promise<Postcreate> => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING user_id, content";

  const queryparams = [id];

  const deletedPost = await queryExc<Postcreate>(
    contextmessage,
    query,
    queryparams,
    true,
  );

  if (!deletedPost) {
    throw new AppError(404, "Not found, post not removed");
  }

  return deletedPost;
};

export const editPost = async (id: number, postcontent: string): Promise<Postcreate> => {
  const query = "UPDATE posts SET content = $1 WHERE id = $2 RETURNING *";
  const queryparams = [postcontent, id];

  const editedPost = await queryExc<Postcreate>(
    contextmessage,
    query,
    queryparams,
    true,
  );

  if (!editedPost) {
    throw new AppError(404, "Post not found");
  }

  return editedPost;
};
