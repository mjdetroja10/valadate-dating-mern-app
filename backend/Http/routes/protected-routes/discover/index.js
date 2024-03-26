const router = require("express").Router();

// all middlewares
const Pagination = require("../../../middleware/Pagination");
const MulterRequest = require("../../../middleware/MulterRequest");

// all controllers
const UserController = require("../../../controllers/UserController");

router.route("/discover").get(Pagination, UserController.allUsers);

router.route("/discover/:id").get(UserController.singleUser);

module.exports = router;
