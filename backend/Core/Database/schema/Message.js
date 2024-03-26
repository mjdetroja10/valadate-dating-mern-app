const { model, Schema } = require("mongoose");

const MessageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    message: {
      type: String,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    users: [
      { type: Schema.Types.ObjectId, ref: "users" },
      { type: Schema.Types.ObjectId, ref: "users" },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = model("messages", MessageSchema);

module.exports = Message;
