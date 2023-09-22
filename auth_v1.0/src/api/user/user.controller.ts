import { NextFunction, Response, Request } from "express";
import { User } from './user.model';

export let usersList = async (req: Request, res: Response, next: NextFunction) => {
  let usersList = await User.find();
  res.json(usersList);
}

export let me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user!);
}