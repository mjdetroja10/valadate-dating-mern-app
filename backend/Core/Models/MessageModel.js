const { MessageSchema } = require("../Database/schema");

class MessageModel {
  static async createNew(data) {
    let modifiedData = { ...data, users: [data.senderId, data.recieverId] };

    let msg = await MessageSchema.create(modifiedData);

    msg.save();

    console.log(msg, "modifiedData");

    return;
  }

  static async getAllMessagaes(user, id) {
    let msgs = await MessageSchema.find({ users: { $all: [user._id, id] } });

    return msgs;
  }
}

module.exports = MessageModel;
