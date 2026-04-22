import { Request, Response } from "express";
import { userValidator } from "../Validators/usersValidators";
import * as userServices from "../Services/userServices";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  
  const newUser = userValidator.validateUser(req.body);

  const registredUser = await userServices.addUser(newUser);

  res.json(registredUser);
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const users = await userServices.getUsers(limit, offset);

  res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  const user = await userServices.getUser(id);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  const user = await userServices.deleteUser(id);

  res.json(user);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  
  const id = Number(req.params.id);
  
  const userData = userValidator.validateUser(req.body);
  
  const editedUser = await userServices.updateUser(id,userData);

  res.json(editedUser);

};

