const router = require("express").Router();

// all middlewares
const SendFriendRequest = require("../../../middleware/friendRequest/SendFriendRequest");

// all controllers
const RequestController = require("../../../controllers/RequestController");
const { STATUS } = require("../../../../Core/Constants/FriendReqConstant");

router.route("/send-request").post(SendFriendRequest([STATUS.pending, STATUS.ignore]), RequestController.sendRequest);

router.route("/pending-request").get(RequestController.pendingRequestList);

router
  .route("/friend-requests")
  .post(SendFriendRequest([STATUS.accept, STATUS.rejected]), RequestController.requestConfirmation);

router.route("/friends").get(RequestController.myFriends);

module.exports = router;
