const router = require("express").Router();

router.use("/", require("./discover"));

router.use("/", require("./friendRequest"));

router.use("/", require("./messages"));

module.exports = router;
