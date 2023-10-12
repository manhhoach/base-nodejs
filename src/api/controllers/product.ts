import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../helpers/response";
import { tryCatch } from "../helpers/tryCatch";
import * as productService from "../services/product";

export const getAll = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await productService.getAll();
    console.log(data);
    
    res.status(200).json(responseSuccess(data));
  }
);

export const create = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = productService.insert(req.body);
    res.status(201).json(responseSuccess(data));
  }
);
