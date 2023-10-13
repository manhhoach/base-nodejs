import express from "express";
const router = express.Router();
import * as receiptDetailsController from "../controllers/receipt-details";

router.post("/add/:receipt_id", receiptDetailsController.add);
router.patch("/", receiptDetailsController.update);
router.delete("/:id", receiptDetailsController.destroy);

export = router;
