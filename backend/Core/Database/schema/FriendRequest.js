const { Schema } = require("mongoose");
const { model } = require("mongoose");
const { frdReqConstant } = require("../../Constants");

const FriendRequest = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: frdReqConstant.REQ_STATUS,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("friend-requests", FriendRequest);
