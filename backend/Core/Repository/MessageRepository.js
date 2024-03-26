const { MessageModel } = require("../Models");

class MessageRepository {
  static async newMessage(msg) {
    return await MessageModel.createNew(msg);
  }

  static async userMsgs(user, friendId) {
    return await MessageModel.getAllMessagaes(user, friendId);
  }

  static async messageDelete(id) {
    return await MessageModel.deleteById(id);
  }

  static async singleMessage(id) {
    return await MessageModel.getById(id);
  }

  static async editMessage(params) {
    return await MessageModel.updateMsg(params);
  }
}

module.exports = MessageRepository;
