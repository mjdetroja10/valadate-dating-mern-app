const { body, validationResult } = require("express-validator");
const validationChecker = require("../validationChecker");
const UserModel = require("../../../Core/Models/UserModel");
const { userConstant } = require("../../../Core/Constants");

let genderOptions = ["male", "female", "nonBinary", "preferNotToSay"];

const SignupRequest = async (req, res, next) => {
  try {
    if ("email" in req.body && req.body.email.length > 0) {
      req.existUser = await UserModel.getByEmail(req.body.email);
    }

    const validations = [
      body("firstName").notEmpty(),
      body("lastName").notEmpty(),
      body("email")
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .custom(() => {
          if (req?.existUser) return Promise.reject("user is already exist");
          return true;
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
      body("city").notEmpty(),
      body("state").notEmpty(),
      body("zip").notEmpty(),
      body("miles").notEmpty(),
      body("gender")
        .notEmpty()
        .bail()
        .custom((value) => {
          console.log(genderOptions.includes(value), "va;ue");
          if (!genderOptions.includes(value)) return Promise.reject("invalid value");
          return true;
        }),
      body("lookingFor")
        .notEmpty()
        .bail()
        .custom((value) => {
          if (!["male", "female", "nonBinary", "any"].includes(value)) return Promise.reject("invalid value");
          return true;
        }),
      body("ageRange")
        .notEmpty()
        .bail()
        .isArray()
        .bail()
        .custom((value) => {
          if (value.length > 0) req.body.ageRange = value.map((x) => parseInt(x));

          return true;
        }),
      body("interests")
        .notEmpty()
        .bail()
        .isArray()
        .bail()
        .custom(async (value) => {
          if (value.length > 0) req.body.interests = value.map((x) => parseInt(x));
          if (userConstant.USER_INTERESTS.findIndex((x) => value.map((x) => parseInt(x)).includes(x.value)) === -1)
            return Promise.reject("invalid value");
          else {
            req.userInterests = userConstant.USER_INTERESTS.filter((int) =>
              value.map((x) => parseInt(x)).includes(int.value)
            ).map(({ label }) => label);
            return true;
          }
        }),
      body("habits")
        .notEmpty()
        .bail()
        .isArray()
        .bail()
        .custom(async (value) => {
          if (value.length > 0) req.body.habits = value.map((x) => parseInt(x));
          if (
            userConstant.USER_PARTY.findIndex((x) => value.map((x) => parseInt(x)).includes(parseInt(x.value))) === -1
          )
            return Promise.reject("invalid value");
          else {
            req.userHabits = userConstant.USER_PARTY.filter((int) =>
              value.map((x) => parseInt(x)).includes(parseInt(int.value))
            ).map(({ label }) => label);
            return true;
          }
        }),
      body("birthDate")
        .exists()
        .not()
        .notEmpty()
        .bail()
        .isISO8601("yyyy-mm-dd")
        .withMessage("start must be in correct format yyyy:mm:dd"),
      ,
    ];

    return validationChecker(validations, req, res, next);
  } catch (error) {
    console.log(error, "errrorrrrrrrrrrrr");
    res.handler.serverError(error);
  }
};

module.exports = SignupRequest;
