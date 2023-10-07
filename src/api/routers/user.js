const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user");
const jwt = require("../middlewares/jwt");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(jwt.checkAccessToken);
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.put("/change-password", userController.changePassword);

module.exports = router;
