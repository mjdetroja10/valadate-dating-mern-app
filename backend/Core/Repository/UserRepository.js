const { UserModel } = require("../Models");
const IP = require("ip");
const EmailVerifyRepository = require("./EmailVerifyRepository");
const { TokenTransformer } = require("../../Http/Transformers");
const Encrypt = require("../Services/Encrypt");

const ipAddress = IP.address();

class UserRepository {
  static async newUser(req) {
    let images = [];

    // if image available
    if (req?.files) {
      images = await req.files.map((file) => {
        let path = file.path.replace(/^public\//, "");

        let imgSrc = `${req.protocol}://${ipAddress}:${process.env.PORT}/${path}`;
        return { src: imgSrc, alt: file?.originalname.split(".")[0] || "" };
      });
    }
    // modified body
    let params = {
      ...req.body,
      interests: req.userInterests,
      habits: req.userHabits,
      images: images,
    };

    let user = await UserModel.createNew(params);

    if (user) {
      let emailVerify = await EmailVerifyRepository.userEmailVerify(user);
      return emailVerify;
    }

    return null;
  }

  static async emailStatusUpdate(userEmail) {
    return UserModel.updateEmailStatus(userEmail);
  }

  static async generateJwtToken(user) {
    let tokenData = await TokenTransformer.tokenAttr(user);

    return await Encrypt.generateJwt(tokenData);
  }

  static async forgotPassword(user) {
    return await EmailVerifyRepository.userForgotPassword(user);
  }

  static async resetPassword(email, password) {
    return await UserModel.resetPassword(email, password);
  }

  static async getAllUsers(user, pagination) {
    return await UserModel.getAllDiscover(user, pagination);
  }

  static getSingleUser(userId, reqUserid) {
    return UserModel.getSingleUser(userId, reqUserid);
  }

  static async getUserByEmail(userEmail) {
    return await UserModel.getByEmail(userEmail);
  }

  static async getUserById(id) {
    return await UserModel.getById(id);
  }
}

module.exports = UserRepository;
