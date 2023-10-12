import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../helpers/response";
import { tryCatch } from "../helpers/tryCatch";
import * as receiptService from "../services/receipt";

export const getAll = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let page_index = req.query.page_index
      ? +(req.query.page_index as string)
      : 1;
    let page_size = req.query.page_size ? +(req.query.page_size as string) : 5;
    let data = await receiptService.getAll(page_index, page_size);
    res.status(200).json(responseSuccess(data));
  }
);

export const create = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    await receiptService.insert(req.body);
    res.status(201).json(responseSuccess(null));
  }
);

export const getDetails = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await receiptService.findById(+req.params.id);
    res.status(200).json(responseSuccess(data));
  }
);

export const update = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    await receiptService.update(+req.params.id, req.body);
    res.status(200).json(responseSuccess(null));
  }
);

export const destroy = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    await receiptService.destroy(+req.params.id);
    res.status(200).json(responseSuccess(null));
  }
);
