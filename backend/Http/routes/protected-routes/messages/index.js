const router = require("express").Router();

const SendMsgRequest = require("../../../middleware/messages/SendMsgRequest");
const MessageController = require("../../../controllers/MessageController");

router.route("/send-msg").post(SendMsgRequest, MessageController.sendMessage);

router.route("/get-msgs/:id").get(MessageController.userMessages);

module.exports = router;
