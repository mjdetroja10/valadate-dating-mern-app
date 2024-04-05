const { FriendSchema, MessageSchema } = require("../Database/schema");

class FriendModel {
  static async getOneFrd(userId, frdId) {
    let frd = await FriendSchema.findOne({ userId: userId, "frd._id": frdId });

    return frd;
  }

  static async isAlreadyFrd(body) {
    let user = await FriendSchema.findOne({
      $or: [
        { userId: body.senderId, "frd._id": body.recieverId },
        { userId: body.recieverId, "frd._id": body.senderId },
      ],
    });

    return user;
  }

  static async myFriends(id) {
    let friends = await FriendSchema.find({ userId: id });

    const data = await Promise.all(
      friends.map(async (x) => {
        let message = await MessageSchema.findOne({ senderId: x.frd._id, recieverId: id }).sort({ createdAt: -1 });
        // let message = await MessageSchema.findOne({ users: { $all: [x.frd._id, id] } }).sort({ createdAt: -1 });

        return { _id: x._id, frd: { ...x.frd, message: message } };
      })
    );

    return data;
  }
}

module.exports = FriendModel;
