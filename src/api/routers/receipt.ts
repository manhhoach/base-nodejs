import express from "express";
const router = express.Router();
import * as receiptController from "../controllers/receipt";

router.get("/", receiptController.getAll);
router.get("/details/:id", receiptController.getDetails);
router.post("/", receiptController.create);
router.patch("/:id", receiptController.update);
router.delete("/:id", receiptController.destroy);

export = router;
