import { Usercreate } from "../Types/User";
import { Userdb } from "../Models/userdbModel";
import queryExc from "../Utils/QueryExecuter";
import { AppError } from "../Classes/appErrors";

const contextMessage = "user";

export const addUser = async (user: Usercreate): Promise<Usercreate> => {
  const query = "INSERT INTO users (username, age) VALUES ($1, $2) RETURNING username, age";
  const params = [user.username, user.age];

  return await queryExc<Usercreate>(contextMessage, query, params, true);
};

export const getUsers = async (
  limit: number,
  offset: number,
): Promise<Userdb[]> => {

  const query = "SELECT * FROM users LIMIT $1 OFFSET $2";
  const params = [limit, offset];

  const rows = await queryExc<Userdb[]>(contextMessage, query, params);

  if (rows.length === 0) {
    throw new AppError(404, "Without users.");
  }

  return rows;
};

export const getUser = async (id: number): Promise<Usercreate> => {
  const query = "SELECT username, age FROM users WHERE id = $1";

  const queryparams = [id];

  const user = await queryExc<Usercreate>(
    contextMessage,
    query,
    queryparams,
    true,
  );

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  return user;
};

export const deleteUser = async (id: number): Promise<Usercreate> => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING username, age";
  const params = [id];

  const deletedUser = await queryExc<Usercreate>(
    contextMessage,
    query,
    params,
    true,
  );

  if (!deletedUser) {
    throw new AppError(404,"User not Found");
    
  }


  return deletedUser;
};


export const updateUser = async (id: number, data: Usercreate): Promise<Usercreate> => {

  const query = "UPDATE users SET username = $1, age = $2 WHERE id = $3 RETURNING username, age";
  const queryparams =  [data.username, data.age, id];

  const updatedUser = await queryExc<Usercreate>(contextMessage, query, queryparams, true);

  if (!updatedUser) {
    throw new AppError(404,"User not Found");
  }

  return updatedUser;

};
