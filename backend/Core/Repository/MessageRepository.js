const { MessageModel } = require("../Models");

class MessageRepository {
  static async newMessage(msg) {
    return await MessageModel.createNew(msg);
  }

  static async userMsgs(user, friendId) {
    return await MessageModel.getAllMessagaes(user, friendId);
  }
}

module.exports = MessageRepository;
