const { body } = require("express-validator");
const validationChecker = require("../validationChecker");
const { UserModel } = require("../../../Core/Models");
const Encrypt = require("../../../Core/Services/Encrypt");

const LoginRequest = async (req, res, next) => {
  try {
    if ("email" in req.body && req.body.email.length > 0) {
      req.loginUser = await UserModel.getByEmail(req.body.email);
    }

    let validations = [
      body("email")
        .notEmpty()
        .bail()
        .isEmail()
        .withMessage("must be email type")
        .bail()
        .custom(() => {
          if (!req.loginUser) return Promise.reject("user does not exist");
          if (!req.loginUser.isEmailVerified)
            return Promise.reject("Your email is not verified. please verified your email first");
          return true;
        }),
      body("password")
        .notEmpty()
        .bail()
        .custom(async () => {
          if (req.loginUser?.password) {
            let isValid = await Encrypt.compareEncyption(req.body.password, req.loginUser.password);
            if (!isValid) return Promise.reject("Incorrect password!");
          }
          return true;
        }),
    ];

    return validationChecker(validations, req, res, next);
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = LoginRequest;
