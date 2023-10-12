import express from "express";
const router = express.Router();

import productRouter from "./product";

router.use("/products", productRouter);

export = router;
