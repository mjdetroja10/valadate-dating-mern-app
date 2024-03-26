const { FriendSchema } = require("../Database/schema");

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

    console.log(user, "isAlreadyFrdisAlreadyFrd");

    return user;
  }

  static async myFriends(id) {
    return await FriendSchema.find({ userId: id });
  }
}

module.exports = FriendModel;
