var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/profile", require("./profile"));

module.exports = router;
