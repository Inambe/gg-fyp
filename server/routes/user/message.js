const express = require("express");
const jwt = require("express-jwt");
const { body, validationResult } = require("express-validator");
const Message = require("../../models/mongoose/message");
const Product = require("../../models/mongoose/product");
const _ = require("lodash");
const isUser = require("./isUser");

const router = express.Router();

router.use(jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), isUser);

router.post(
	"/create",
	body("content").notEmpty(),
	body("nursery").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const { content, nursery } = req.body;

		const message = new Message({
			content,
			nursery,
			user: req.user.sub,
			from: "user",
		});

		try {
			await message.save();
			return res.json({
				success: true,
				message: "Message created successfully.",
			});
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

router.get("/list/:nurseryId", async (req, res) => {
	try {
		const userId = req.user.sub;
		const nurseryId = req.params.nurseryId;
		const messages = await Message.where("nursery", nurseryId)
			.where("user", userId)
			.find();

		return res.json({ success: true, data: messages });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/list", async (req, res) => {
	try {
		const userId = req.user.sub;
		const messages = await Message.where("user", userId)
			.select("nursery")
			.find()
			.populate("nursery")
			.exec();

		let nurseries = [];
		messages.forEach((msg) => {
			nurseries.push(msg.nursery);
		});
		nurseries = _.uniq(nurseries);

		return res.json({ success: true, data: nurseries });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

// router.post("/delete/:id", async (req, res) => {
// 	try {
// 		const productId = req.params.id;
// 		await Product.findByIdAndDelete(productId);
// 		return res.json({ success: true });
// 	} catch (e) {
// 		return res.send({ success: false, message: e.message });
// 	}
// });

// router.get("/:id", async (req, res) => {
// 	try {
// 		const productId = req.params.id;
// 		const product = await Product.findById(productId);
// 		return res.json({ success: true, data: product });
// 	} catch (e) {
// 		return res.send({ success: false, message: e.message });
// 	}
// });

// router.post(
// 	"/:id",
// 	upload.single("picture"),
// 	body("name").notEmpty(),
// 	async (req, res) => {
// 		const productId = req.params.id;
// 		const product = await Product.findById(productId);
// 		if (!product)
// 			return res.json({
// 				success: false,
// 				message: "Product not found.",
// 			});

// 		const errors = validationResult(req);
// 		if (!errors.isEmpty())
// 			return res.json({
// 				success: false,
// 				message: "Provided information was not valid.",
// 				data: errors.array(),
// 			});

// 		const picture = req.file;
// 		if (picture) {
// 			product.picture = picture.filename;
// 		}

// 		const { name } = req.body;

// 		product.name = name;

// 		try {
// 			await product.save();
// 			return res.json({
// 				success: true,
// 				message: "Product updated successfully.",
// 			});
// 		} catch (e) {
// 			return res.send({ success: false, message: e.message });
// 		}
// 	}
// );

module.exports = router;
