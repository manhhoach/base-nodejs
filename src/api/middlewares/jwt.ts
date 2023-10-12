import jwt from "jsonwebtoken";
const userService = require("../services/user");
import { tryCatch } from "./../helpers/tryCatch";
import AppError from "./../helpers/AppError";
import { NextFunction } from "express";

export const signAccessToken = (user: any) => {
  return jwt.sign(user, process.env.SECRET_KEY_ACCESS_TOKEN as string, {
    expiresIn: "6h",
  });
};

export const checkAccessToken = tryCatch(
  async (req: any, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      let decoded: any = jwt.verify(
        token,
        process.env.SECRET_KEY_ACCESS_TOKEN as string
      );
      let user = await userService.findById(decoded.id);
      if (user) {
        req.user = user.dataValues;
        return next();
      }
      return next(new AppError(404, "USER_NOT_FOUND"));
    } else return next(new AppError(404, "TOKEN_NOT_PROVIDED"));
  }
);
