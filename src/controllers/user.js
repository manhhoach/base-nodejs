const { responseSuccess } = require("../utils/response");
const bcryptjs = require("bcryptjs");
const CONSTANT_MESSAGES = require("../utils/constants/messages");
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const userModel = require("./../database/db").models.users;

module.exports.getMe = tryCatch(async (req, res, next) => {
  res.status(200).json(responseSuccess(req.user));
});

module.exports.register = tryCatch(async (req, res, next) => {
  let data = await userService.create(req.body);
  delete data.dataValues.password;
  res.status(201).json(responseSuccess(data.dataValues));
});

module.exports.login = tryCatch(async (req, res, next) => {
  let user = await userModel.findOne({ where: { email: req.body.email } });
  if (user) {
    user = JSON.parse(JSON.stringify(user));
    let checkPassword = bcryptjs.compareSync(req.body.password, user.password);
    if (checkPassword) {
      let accessToken = jwt.signAccessToken({
        id: user.id,
      });
      res.status(200).json(responseSuccess({ ...user, accessToken }));
    } else {
      next(new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD));
    }
  } else {
    next(new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND));
  }
});

module.exports.updateMe = tryCatch(async (req, res, next) => {
  if (req.body.password) delete req.body.password;
  let data = await userModel.update(req.body, { where: { id: req.user.id } });
  if (data[0] === 1) {
    data = await userModel.findOne({ where: { id: req.user.id } });
    res.status(201).json(responseSuccess(data));
  } else {
    next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
  }
});

module.exports.changePassword = tryCatch(async (req, res, next) => {
  let password = (await userService.findOne({ id: req.user.id }, true))
    .password;
  let checkPassword = bcryptjs.compareSync(req.body.oldPassword, password);
  if (checkPassword) {
    let data = await userService.updateByCondition(
      { password: req.body.newPassword },
      { id: req.user.id }
    );
    if (data[0] === 1)
      res
        .status(201)
        .json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY));
    else next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
  } else {
    next(new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD));
  }
});
