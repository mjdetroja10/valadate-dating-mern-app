const moment = require("moment");

const { UserRepository, EmailVerifyRepository } = require("../../Core/Repository");

class AuthController {
  static async loginUser(req, res) {
    try {
      if (req.loginUser) {
        let token = await UserRepository.generateJwtToken(req.loginUser);
        return res.handler.success({ token }, "user loggedIn successfully");
      }

      return res.handler.validationError(null, "user not found");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async emailVerify(req, res) {
    try {
      let success = false;

      if (req?.emailVerifyData) {
        let expiredAt = moment(req?.emailVerifyData.expiredAt).format();
        let currentTime = moment().format();

        if (expiredAt > currentTime) {
          await UserRepository.emailStatusUpdate(req?.emailVerifyData.userEmail);

          success = true;
        }
      }

      await EmailVerifyRepository.deleteMailById(req?.emailVerifyData.id);

      if (success) {
        res.handler.success();
      } else {
        res.handler.notFound();
      }
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async forgotPassword(req, res) {
    try {
      if (req?.existUser) {
        await UserRepository.forgotPassword(req.existUser);
        return res.handler.success(null, "Please check your mail and change password");
      }
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async resetPassword(req, res) {
    try {
      let success = false;

      if (req?.emailData) {
        let currentTime = moment().format();
        let expiredTime = moment(req.emailData?.expiredAt).format();

        let user = await UserRepository.getUserByEmail(req.emailData?.userEmail);

        if (expiredTime > currentTime && user) {
          await UserRepository.resetPassword(user.email, req.body.password);
          success = true;
        }
      }
      await EmailVerifyRepository.deleteMailById(req.emailData?.id);

      if (success) {
        return res.handler.success(null, "password change successfully");
      }

      return res.handler.notFound();
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = AuthController;
