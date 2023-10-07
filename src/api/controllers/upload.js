const AppError = require("../helpers/AppError");
const { responseSuccess } = require("../helpers/response");
const tryCatch = require("../helpers/tryCatch");
// const fs = require("fs");
// const CONSTANT_MESSAGES = require("../constants/messages");

module.exports.upload = tryCatch(async (req, res, next) => {
  // if (req.file) {
  //   if (!req.file.mimetype.includes("image")) {
  //     return next(new AppError(400, CONSTANT_MESSAGES.WRONG_FILE_FORMAT));
  //   }
  //   let path = `${Date.now()}-${req.file.originalname}`;
  //   fs.writeFileSync(`src/public/${path}`, req.file.buffer);
  //   res.status(200).json(responseSuccess(path));
  // } else {
  //   next(new AppError(400, CONSTANT_MESSAGES.NOT_FILE_SELECTED));
  // }
});
