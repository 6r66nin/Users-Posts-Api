import { NextFunction, Request, Response } from "express";
import { AppError } from "../Classes/appErrors";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err);
  
  const errstatus = err instanceof AppError ? err.statusCode : 500;
  
  const errmessage = err instanceof AppError ? err.message : "Internal server error";

  res.status(errstatus).json({error: errmessage});
};

export default errorHandler;