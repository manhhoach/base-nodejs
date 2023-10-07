const express = require("express");
const router = express.Router();

const uploadRouter = require("./upload");
const userRouter = require("./user");

router.use("/users", userRouter);
router.use("/upload", uploadRouter);

module.exports = router;
