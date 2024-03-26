const { MessageRepository } = require("../../Core/Repository");

class MessageController {
  static async sendMessage(req, res) {
    try {
      if (req?.accessingUser.email === req.msgSender.email) {
        const msg = await MessageRepository.newMessage(req.body);

        return res.handler.success(msg);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async userMessages(req, res) {
    try {
      if (req?.accessingUser) {
        const msgs = await MessageRepository.userMsgs(req?.accessingUser, req.params.id);

        return res.handler.success(msgs);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async deleteMessage(req, res) {
    try {
      if (req?.accessingUser) {
        const msgs = await MessageRepository.messageDelete(req.params.id);

        return res.handler.success(msgs);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }

  static async editMessage(req, res) {
    try {
      if (req?.accessingUser) {
        const edited = await MessageRepository.editMessage(req.body);

        return res.handler.success(edited);
      }

      return res.handler.serverError("invalid request");
    } catch (error) {
      res.handler.serverError(error);
    }
  }
}

module.exports = MessageController;
