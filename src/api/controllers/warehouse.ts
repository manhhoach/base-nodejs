import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../helpers/response";
import { tryCatch } from "../helpers/tryCatch";
import * as warehouseService from "../services/warehouse";

export const getAll = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await warehouseService.getAll();
    res.status(200).json(responseSuccess(data));
  }
);

export const create = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    await warehouseService.insert(req.body);
    res.status(201).json(responseSuccess(null));
  }
);
