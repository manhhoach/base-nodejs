const jwt_token = require('../middlewares/jwt_token');
const { responseSuccess } = require('../utils/response')
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

module.exports.getMe = tryCatch(async (req, res, next) => {
    res.status(200).json(responseSuccess(req.user))
})

module.exports.register = tryCatch(async (req, res, next) => {

    let user = { ...req.body };
    let data = await userService.create(user);
    delete data.dataValues.password;
    res.status(201).json(responseSuccess(data.dataValues));

})

module.exports.login = tryCatch(async (req, res, next) => {

    let user = await userService.findOne({ email: req.body.email }, true);
    if (user) {
        user = user.dataValues;
        let checkPassword = bcryptjs.compareSync(req.body.password, user.password);
        if (checkPassword) {
            let accessToken = jwt_token.signAccessToken({
                id: user.id
            })
            let refreshToken = jwt_token.signRefreshToken({
                id: user.id
            })
            delete user.password;
            res.status(200).json(responseSuccess({ ...user, accessToken, refreshToken }))
        }
        else {
            next(new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD))
        }
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND))
    }


})



module.exports.updateMe = tryCatch(async (req, res, next) => {

    if (req.body.status)
        delete req.body.status;
    if (req.body.password)
        delete req.body.password;

    let data = await userService.updateByCondition(req.body, { id: req.user.id });
    if (data[0] === 1) {
        data = await userService.findOne({ id: req.user.id }, false);
        res.status(201).json(responseSuccess(data))
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED))
    }


})

module.exports.changePassword = tryCatch(async (req, res, next) => {

    let password = (await userService.findOne({ id: req.user.id }, true)).password;
    let checkPassword = bcryptjs.compareSync(req.body.oldPassword, password);
    if (checkPassword) {
        let data = await userService.updateByCondition({ password: req.body.newPassword }, { id: req.user.id });
        if (data[0] === 1)
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
        else
            next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED))

    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD))
    }


})




