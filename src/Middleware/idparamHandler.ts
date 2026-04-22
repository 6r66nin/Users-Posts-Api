import { NextFunction, Request, Response } from "express";
import { AppError } from "../Classes/appErrors";
import { validateId } from "../Validators/utilsValidators";

export default (req: Request, res: Response, next: NextFunction) => {
  
  const { id } = req.params;
  
  if (validateId(id)) {
    return next();
  }

  next(new AppError(400, "invalid id param"));
};
