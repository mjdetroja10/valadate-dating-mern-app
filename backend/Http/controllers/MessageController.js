const { MessageRepository } = require("../../Core/Repository");

class MessageController {
  static async sendMessage(req, res) {
    try {
      console.log(req.msgSender, "req.msgSender");
      if (req?.accessingUser.email === req.msgSender.email) {
        const msg = await MessageRepository.newMessage(req.body);

        return res.handler.success(req.body);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async userMessages(req, res) {
    try {
      console.log(req.params, "req.msgSender");
      if (req?.accessingUser) {
        const msgs = await MessageRepository.userMsgs(req?.accessingUser, req.params.id);

        return res.handler.success(msgs);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = MessageController;
