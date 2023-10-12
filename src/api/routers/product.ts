import express from "express";
const router = express.Router();
import * as productController from "../controllers/product";

router.get("/", productController.getAll);
router.post("/", productController.create);

export = router;
