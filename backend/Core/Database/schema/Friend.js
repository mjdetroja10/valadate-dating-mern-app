const { model, Schema } = require("mongoose");
const { UserSchema } = require("./User");

const FriendSchema = new Schema({
  userId: { type: String, required: true },
  frd: {
    _id: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    images: [
      {
        src: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
  },
});

const Friend = model("friends", FriendSchema);

module.exports = Friend;
