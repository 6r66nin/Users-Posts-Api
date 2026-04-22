import queryExc from "../Utils/QueryExecuter";
import { AppError } from "../Classes/appErrors";

const contextmessage = "like";

export const getLikesfromPost = async (id: number) => {
  const query =
    "SELECT username as user, likes.created_at FROM likes INNER JOIN users ON likes.user_id = users.id WHERE post_id = $1 ";
  const queryparam = [id];

  const likes = await queryExc<any[]>(contextmessage, query, queryparam);

  if (!likes.length) {
    throw new AppError(404, "Post without likes");
  }

  return likes;
};

export const addLike = async (postId: number, userId: number) => {
  const query =
    "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *";
  const queryparams = [userId, postId];

  const like = await queryExc<any>(contextmessage, query, queryparams, true);

  if (!like) {
    throw new AppError(404, "Post or User not exist");
  }

  return like;
};

export const deleteLike = async (userId: number, postId: number) => {
  const query =
    "DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *";
  const queryparams = [userId, postId];

  const deletedLike = await queryExc<any>(
    contextmessage,
    query,
    queryparams,
    true,
  );

  if (!deletedLike) {
    throw new AppError(404, "Post or User not exist");
  }

  return deletedLike;
};
