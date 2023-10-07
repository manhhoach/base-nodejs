const express = require("express");
const router = express.Router();
const uploadController = require("./../controllers/upload");
const { upload } = require("./../middlewares/upload");

router.post("/", upload.single("file"), uploadController.upload);

module.exports = router;
