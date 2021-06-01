const express = require("express");
const Product = require("../models/mongoose/product");
const Nursery = require("../models/mongoose/nursery");
const { PAGE_LIMIT } = require("../constants");

const router = express.Router();

router.get("/list", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || PAGE_LIMIT;
		const skip = (page - 1) * limit;

		const products = await Product.find()
			.sort({ "createdAt": "desc" })
			.limit(limit)
			.skip(skip)
			.populate("nursery")
			.exec();

		let next;
		let prev;
		const count = await Product.find().skip(skip).countDocuments();
		if (count > limit) {
			next = page + 1;
		}
		if (page > 1) {
			prev = page - 1;
		}

		return res.json({ success: true, data: products, next, prev });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/list/:nurseryId", async (req, res) => {
	try {
		const nurseryId = req.params.nurseryId;
		const products = await Product.find({
			nursery: nurseryId,
		});

		return res.json({ success: true, data: products });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/search", async (req, res) => {
	try {
		const query = req.query.query;
		const queryExp = new RegExp(query, "i");

		const nurseries = await Nursery.find({
			$or: [
				{
					name: queryExp,
				},
				{
					location: queryExp,
				},
			],
		});
		const nurseriesIds = nurseries.map((n) => n._id);

		const products = await Product.find({
			$or: [
				{ name: queryExp },
				{ fertilizer: queryExp },
				{ nursery: { $in: nurseriesIds } },
			],
		})
			.populate("nursery")
			.exec();

		return res.json({ success: true, data: products });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findById(productId)
			.populate("nursery")
			.exec();
		return res.json({ success: true, data: product });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

module.exports = router;
