const express = require("express");
const jwt = require("express-jwt");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const Product = require("../../models/mongoose/product");
const isNursery = require("./isNursery");

const router = express.Router();
const upload = multer({
	dest: "uploads/",
});

router.use(
	jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
	isNursery
);

router.post(
	"/create",
	upload.single("picture"),
	body("name").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const picture = req.file;
		if (!picture)
			return res.json({
				success: false,
				message: "Picture is required.",
			});

		const { name } = req.body;
		const picturePath = picture.path;
		const nurseryId = req.user.sub;

		const product = new Product({
			name,
			picture: picturePath,
			nursery: nurseryId,
		});

		try {
			await product.save();
			return res.json({ success: true, data: product });
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

module.exports = router;
