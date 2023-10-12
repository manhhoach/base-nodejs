import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../helpers/response";
import { tryCatch } from "../helpers/tryCatch";
import * as userService from "./../services/user";

export const register = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await userService.register(req.body);
    res.status(201).json(responseSuccess(data));
  }
);

export const login = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await userService.login(req.body.email, req.body.password);
    res.status(200).json(responseSuccess(data));
  }
);
