const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/descriptions", require("./descriptions.routes"));

module.exports = router;
