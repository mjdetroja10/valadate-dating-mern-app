const { body } = require("express-validator");
const validationChecker = require("../validationChecker");
const { UserModel } = require("../../../Core/Models");

const ForgotPasswordRequest = (req, res, nxt) => {
  try {
    const validations = [
      body("email")
        .notEmpty()
        .bail()
        .isEmail()
        .withMessage("must be in email format")
        .bail()
        .custom(async (value) => {
          console.log("value", value);
          let existUser = await UserModel.getByEmail(value);
          if (existUser) {
            req.existUser = existUser;
            return true;
          }

          return Promise.reject("user does not exist");
        }),
    ];

    return validationChecker(validations, req, res, nxt);
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = ForgotPasswordRequest;
