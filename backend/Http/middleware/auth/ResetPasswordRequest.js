const { body } = require("express-validator");
const { EmailVerifyModel } = require("../../../Core/Models");
const validationChecker = require("../validationChecker");

const ResetPasswordRequest = (req, res, nxt) => {
  try {
    const validations = [
      body("code")
        .notEmpty()
        .bail()
        .custom(async (value) => {
          let emailData = await EmailVerifyModel.findByCode(value);
          if (emailData && emailData?.reason === "resetPassword") {
            req.emailData = emailData;
            return true;
          }

          return Promise.reject("token is invalid or expired");
        }),
      body("password")
        .notEmpty()
        .bail()
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10,
        })
        .withMessage("strong password required"),
    ];

    return validationChecker(validations, req, res, nxt);
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = ResetPasswordRequest;
