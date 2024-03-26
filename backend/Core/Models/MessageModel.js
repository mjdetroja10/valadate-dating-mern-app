const { MessageSchema } = require("../Database/schema");

class MessageModel {
  static async createNew(data) {
    let modifiedData = { ...data, users: [data.senderId, data.recieverId] };

    let msg = await MessageSchema.create(modifiedData);

    msg.save();

    return msg;
  }

  static async getAllMessagaes(user, id) {
    let msgs = await MessageSchema.find({ users: { $all: [user._id, id] } });

    return msgs;
  }

  static async deleteById(id) {
    return await MessageSchema.findByIdAndDelete(id);
  }

  static async getById(id) {
    return await MessageSchema.findById(id);
  }

  static async updateMsg(body) {
    return await MessageSchema.updateOne({ _id: body.id }, { $set: { message: body.message, isEdited: true } });
  }
}

module.exports = MessageModel;
