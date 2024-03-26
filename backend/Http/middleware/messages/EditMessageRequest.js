const { body } = require("express-validator");
const { MessageRepository } = require("../../../Core/Repository");
const validationChecker = require("../validationChecker");

const EditMessageRequest = (req, res, nxt) => {
  try {
    const validations = [
      body("id")
        .notEmpty()
        .custom(async (value) => {
          let existMsg = await MessageRepository.singleMessage(value);

          if (existMsg) return true;

          return Promise.reject("invliad request");
        }),
      body("message").notEmpty(),
    ];

    return validationChecker(validations, req, res, nxt);
  } catch (e) {
    res.handler.serverError(e);
  }
};

module.exports = EditMessageRequest;
