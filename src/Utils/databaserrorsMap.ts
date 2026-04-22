import { HttpResp } from "../Types/HttpResp";

export const errorMap: Record<number, Record<string, HttpResp>> = {
  23505: {
    user: {
      statusCode: 409,
      message: "Username is already registered",
    },
    post: {
      statusCode: 409,
      message: "This post already exists",
    },
    like: {
      statusCode: 409,
      message: "Already liked this post",
    },
  },
  23503: {
    user: {
      statusCode: 400,
      message: "Referenced user does not exist",
    },
    post: {
      statusCode: 400,
      message: "Referenced user does not exist",
    },
    like: {
      statusCode: 400,
      message: "User or post does not exist",
    },
  },
  23502: {
    user: {
      statusCode: 400,
      message: "Required user fields are missing",
    },
    post: {
      statusCode: 400,
      message: "Required post fields are missing",
    },
    like: {
      statusCode: 400,
      message: "Required fields are missing",
    },
  },
  23514: {
    user: {
      statusCode: 400,
      message: "User data violates a constraint",
    },
    post: {
      statusCode: 400,
      message: "Post data violates a constraint",
    },
    like: {
      statusCode: 400,
      message: "Data violates a constraint",
    },
  },
};
