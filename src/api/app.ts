import express, { Request, Response, NextFunction } from "express";
const app = express();
import path from "path";

import { responseWithError } from "./helpers/response";
import routers from "./routers";
import AppError from "./helpers/AppError";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routers);
app.use((err: AppError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json(responseWithError(err));
});

export = app;
