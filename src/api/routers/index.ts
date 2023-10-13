import express from "express";
const router = express.Router();

import productRouter from "./product";
import warehouseRouter from "./warehouse";
import receiptRouter from "./receipt";
import receiptDetailRouter from "./receipt-details";

router.use("/products", productRouter);
router.use("/warehouses", warehouseRouter);
router.use("/receipts", receiptRouter);
router.use("/receipt-details", receiptDetailRouter);

export = router;
