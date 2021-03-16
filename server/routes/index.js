const express = require("express");
const path = require("path");
const fs = require("fs");
const FileType = require("file-type");

var router = express.Router();

router.get("/uploads/:name", async (req, res) => {
	const name = req.params.name;

	const file = path.resolve(__dirname, "../uploads", name);
	if (!fs.existsSync(file)) {
		res.status(404);
		return res.send("404");
	}

	const fileType = await FileType.fromFile(file);
	if (!fileType) {
		res.status(401);
		return res.send("401");
	}

	res.type(fileType.mime);
	res.sendFile(file);
});

router.use("/products", require("./products"));

module.exports = router;
