const schema = {
  UserSchema: require("./User").User,
  EmailVerificationSchema: require("./EmailValidation"),
  FriendRequest: require("./FriendRequest"),
  FriendSchema: require("./Friend"),
  MessageSchema: require("./Message"),
};

module.exports = schema;
