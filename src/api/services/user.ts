
import AppError from "../helpers/AppError";
import * as jwt from "../middlewares/jwt";


export const login = async (email: string, password: string) => {
  // let user = await userModel.findOne({ where: { email: email } });
  // if (user) {
  //   user = JSON.parse(JSON.stringify(user));
  //   let checkPassword = bcryptjs.compareSync(password, user.password);
  //   if (checkPassword) {
  //     let accessToken = jwt.signAccessToken({
  //       id: user.id,
  //     });
  //     return { ...user, accessToken };
  //   } else {
  //     throw new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD);
  //   }
  // } else {
  //   throw new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND);
  // }
};



export const register = async (data: any) => {
  // let user = await userModel.findOne({ where: { email: data.email } });
  // if (user) {
  //   throw new AppError(400, CONSTANT_MESSAGES.EXISTED_EMAIL_);
  // }
  // let userCreated = await userModel.create(data);
  // userCreated = JSON.parse(JSON.stringify(userCreated));
  // delete userCreated.password;
  // return userCreated;
};

