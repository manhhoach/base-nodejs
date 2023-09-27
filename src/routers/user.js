const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user");
const jwt_token = require("./../middlewares/jwt_token");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(jwt_token.checkAccessToken);
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.put("/change-password", userController.changePassword);

module.exports = router;
