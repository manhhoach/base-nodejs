const jwt = require("jsonwebtoken");
const { responseWithError } = require("./../helpers/response");
const userService = require("../services/user");
const CONSTANT_MESSAGES = require("../constants/messages");
const tryCatch = require("./../helpers/tryCatch");
const AppError = require("./../helpers/AppError");

module.exports.signAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "6h",
  });
};

module.exports.checkAccessToken = tryCatch(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN,
      async (err, decoded) => {
        if (err) {
          let message =
            err.name === "TokenExpiredError"
              ? CONSTANT_MESSAGES.EXPIRED_TOKEN
              : CONSTANT_MESSAGES.INVALID_TOKEN;
          return next(new AppError(401, message));
        }
        let user = await userService.findById(decoded.id);
        if (user) {
          req.user = user.dataValues;
          return next();
        }
        return next(new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND));
      }
    );
  } else return next(new AppError(404, CONSTANT_MESSAGES.TOKEN_NOT_PROVIDED));
});

module.exports.checkAdmin = async (req, res, next) => {
  if (req.user.status === 1) next();
  else res.json(responseWithError(CONSTANT_MESSAGES.NOT_ALLOWED));
};
