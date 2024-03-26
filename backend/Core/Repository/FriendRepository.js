const { FriendModel } = require("../Models");

class FriendRepository {
  static async oneFriend(myId, frdId) {
    return await FriendModel.getOneFrd(myId, frdId);
  }

  static async isFriend(data) {
    return await FriendModel.isAlreadyFrd(data);
  }

  static async myFriendList(id) {
    return await FriendModel.myFriends(id);
  }
}

module.exports = FriendRepository;
