import { User } from "@models/user";
import { NextFunction, Request, Response } from "express";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("logged in user", req.user);

  const result = await User.findOne({ id: req.params.id });

  res.send(result);
  next();
};
