var express = require("express");
const Nursery = require("../../models/mongoose/nursery");
var router = express.Router();

router.get("/list", async (req, res) => {
	try {
		const nurseries = await Nursery.find();

		return res.json({ success: true, data: nurseries });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/profile", require("./profile"));
router.use("/message", require("./message"));

module.exports = router;
