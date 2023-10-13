import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../helpers/response";
import { tryCatch } from "../helpers/tryCatch";
import * as receiptDetailService from "../services/receipt-details";



export const add = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    receiptDetailService.insert(+req.params.receipt_id, req.body);
    res.status(201).json(responseSuccess(null));
  }
);

export const update = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    receiptDetailService.update(req.body);
    res.status(200).json(responseSuccess(null));
  }
);

export const destroy = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    receiptDetailService.destroy(+req.params.id);
    res.status(200).json(responseSuccess(null));
  }
);
