const { body } = require("express-validator");

const validationChecker = require("../validationChecker");

const { UserRepository } = require("../../../Core/Repository");

const SendFriendRequest = (status) => (req, res, nxt) => {
  try {
    const validations = [
      body("senderId")
        .notEmpty()
        .bail()
        .custom(async (value) => {
          let senderUser = await UserRepository.getUserById(value);

          if (senderUser) {
            req.senderUser = senderUser;
            return true;
          }

          return Promise.reject("sender user is invalid");
        }),
      body("recieverId")
        .notEmpty()
        .bail()
        .custom(async (value) => {
          let reciever = await UserRepository.getUserById(value);

          if (reciever) {
            req.reciever = reciever;
            return true;
          }

          return Promise.reject("reciever user is invalid");
        }),
      body("status")
        .notEmpty()
        .bail()
        .custom((value) => {
          if (!status.includes(value)) return Promise.reject("status is invalid");
          return true;
        }),
    ];

    return validationChecker(validations, req, res, nxt);
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = SendFriendRequest;
