const { responseSuccess } = require("../helpers/response");
const tryCatch = require("../helpers/tryCatch");
const userService = require("./../services/user");

module.exports.getMe = tryCatch(async (req, res, next) => {
  res.status(200).json(responseSuccess(req.user));
});

module.exports.register = tryCatch(async (req, res, next) => {
  let data = await userService.register(req.body);
  res.status(201).json(responseSuccess(data));
});

module.exports.login = tryCatch(async (req, res, next) => {
  let data = await userService.login(req.body.email, req.body.password);
  res.status(200).json(responseSuccess(data));
});

module.exports.updateMe = tryCatch(async (req, res, next) => {
  if (req.body.password) delete req.body.password;
  let data = await userService.update(req.body, id);
  res.status(200).json(responseSuccess(data));
});

module.exports.changePassword = tryCatch(async (req, res, next) => {
  let data = await userService.changePassword(
    req.user.id,
    req.body.oldPassword,
    req.body.newPassword
  );
  res.status(200).json(responseSuccess(data));
});
