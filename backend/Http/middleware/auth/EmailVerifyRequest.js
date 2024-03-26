const { body } = require("express-validator");
const validationChecker = require("../validationChecker");
const { EmailVerifyModel } = require("../../../Core/Models");

const EmailVerifyRequest = async (req, res, next) => {
  try {
    if ("code" in req.body && req.body.code.length > 0) {
      req.emailVerifyData = await EmailVerifyModel.findByCode(req.body.code);
    }

    const validations = [
      body("code")
        .notEmpty()
        .bail()
        .custom(() => {
          if (!req.emailVerifyData || req.emailVerifyData.reason !== "emailVerification") {
            return Promise.reject("token has been expired or invalid");
          }
          return true;
        }),
    ];

    return validationChecker(validations, req, res, next);
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = EmailVerifyRequest;
