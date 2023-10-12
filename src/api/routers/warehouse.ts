import express from "express";
const router = express.Router();
import * as warehouseController from "../controllers/warehouse";

router.get("/", warehouseController.getAll);
router.post("/", warehouseController.create);

export = router;
