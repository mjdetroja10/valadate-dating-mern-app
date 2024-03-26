const router = require("express").Router();

const SendMsgRequest = require("../../../middleware/messages/SendMsgRequest");
const MessageController = require("../../../controllers/MessageController");
const EditMessageRequest = require("../../../middleware/messages/EditMessageRequest");

router.route("/send-msg").post(SendMsgRequest, MessageController.sendMessage);

router.route("/get-msgs/:id").get(MessageController.userMessages);

router.route("/delete-message/:id").delete(MessageController.deleteMessage);

router.route("/edit-message").post(EditMessageRequest, MessageController.editMessage);

module.exports = router;
