const { body } = require("express-validator");
const validationChecker = require("../validationChecker");

const { UserRepository, FriendRepository } = require("../../../Core/Repository");

const SendMsgRequest = async (req, res, nxt) => {
  try {
    if ("senderId" in req.body && req.body.senderId) {
      let sender = await UserRepository.getUserById(req.body.senderId);
      if (sender) req.msgSender = sender;
    }

    const validations = [
      body("senderId")
        .notEmpty()
        .bail()
        .custom(async () => {
          if (req?.msgSender) return true;
          return Promise.reject("invalid senderId");
        }),
      body("recieverId")
        .notEmpty()
        .bail()
        .custom(async (value) => {
          let reciever = await FriendRepository.oneFriend(req.msgSender?._id, value);
          if (reciever) {
            return true;
          }

          return Promise.reject("not your friend");
        }),
      ,
      body("message").notEmpty(),
    ];

    return validationChecker(validations, req, res, nxt);
  } catch (error) {
    res.handler.serverError();
  }
};

module.exports = SendMsgRequest;
