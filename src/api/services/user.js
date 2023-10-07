const userModel = require("../database/db").models.users;
const bcryptjs = require("bcryptjs");
const CONSTANT_MESSAGES = require("../constants/messages");
const AppError = require("../helpers/AppError");
const jwt = require("../middlewares/jwt");

module.exports.login = async (email, password) => {
  let user = await userModel.findOne({ where: { email: email } });
  if (user) {
    user = JSON.parse(JSON.stringify(user));
    let checkPassword = bcryptjs.compareSync(password, user.password);
    if (checkPassword) {
      let accessToken = jwt.signAccessToken({
        id: user.id,
      });
      return { ...user, accessToken };
    } else {
      throw new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD);
    }
  } else {
    throw new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND);
  }
};

module.exports.findById = async (id) => {
  return userModel.findOne({ where: { id: id } });
};

module.exports.register = async (data) => {
  let user = await userModel.findOne({ where: { email: data.email } });
  if (user) {
    throw new AppError(400, CONSTANT_MESSAGES.EXISTED_EMAIL_);
  }
  let userCreated = await userModel.create(data);
  userCreated = JSON.parse(JSON.stringify(userCreated));
  delete userCreated.password;
  return userCreated;
};

module.exports.update = async (data, id) => {
  let result = await userModel.update(data, { where: { id: id } });
  if (result[0] === 1) {
    return userModel.findOne({ where: { id: id } });
  } else {
    throw new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED);
  }
};

module.exports.changePassword = async (id, oldPassword, newPassword) => {
  let password = (
    await userModel.findOne({ where: { id: id }, attributes: ["password"] })
  ).password;

  let isCorrectPassword = bcryptjs.compareSync(oldPassword, password);
  if (isCorrectPassword) {
    let data = await userModel.update(
      { password: newPassword },
      { where: { id: id } }
    );
    if (data[0] === 1) {
      return CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY;
    } else {
      throw new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED);
    }
  } else {
    throw new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD);
  }
};
