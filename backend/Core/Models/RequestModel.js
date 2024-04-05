const { STATUS } = require("../Constants/FriendReqConstant");

const { FriendRequest, UserSchema, FriendSchema } = require("../Database/schema");

class RequestModel {
  static async sendReq(data) {
    let frdReq = await FriendRequest.create(data);

    frdReq.save();

    return frdReq;
  }

  static async isRecieverAvalaible(user) {
    return await FriendRequest.findOne({ senderId: user?.senderId, recieverId: user.recieverId });
  }

  static async isFriendReqAvalaible(user) {
    return await FriendRequest.findOne({ senderId: user.recieverId, recieverId: user?.senderId });
  }

  static async getRecieverById(id) {
    let sentReqUsers = await FriendRequest.find({ $or: [{ senderId: id }, { recieverId: id }] });

    return sentReqUsers;
  }

  static async pendingRequest(user) {
    let pendingReq = await FriendRequest.find({ $and: [{ recieverId: user._id }, { status: STATUS.pending }] });

    let recieverIds = pendingReq.map((x) => x.senderId);

    let users = await UserSchema.find(
      {
        $and: [{ email: { $ne: user?.email } }, { _id: { $in: recieverIds } }],
      },
      { password: 0 }
    );

    return users;
  }

  static async reqHandler(body) {
    if (body.status === STATUS.accept) {
      let pendingReq = await FriendRequest.updateOne(
        { senderId: body.recieverId, recieverId: body?.senderId },
        { status: STATUS.accept }
      );

      let sender = await UserSchema.findById(body.senderId);
      let senderFrd = await new FriendSchema({ userId: body.recieverId, frd: sender });
      await senderFrd.save();

      let reciever = await UserSchema.findById(body.recieverId);
      let recieverFrd = await new FriendSchema({ userId: body.senderId, frd: reciever });
      await recieverFrd.save();

      return body?.recieverId;
    }

    if (body.status === STATUS.rejected) {
      let rejectedReq = await FriendRequest.updateOne(
        {
          $and: [{ senderId: body.recieverId, recieverId: body?.senderId }, { userId: 0 }],
        },
        { status: STATUS.rejected }
      );

      return body?.recieverId;
    }
  }

  static async allFriends(user) {
    let frds = await FriendSchema.find({ userId: user._id });

    return frds;
  }
}

module.exports = RequestModel;
