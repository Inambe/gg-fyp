const express = require("express");
const jwt = require("express-jwt");
const { body, validationResult } = require("express-validator");
const Nursery = require("../../models/mongoose/nursery");
const isNursery = require("./isNursery");

const router = express.Router();

router.use(
	jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
	isNursery
);

router.get("/", async (req, res) => {
	const nurseryId = req.user.sub;
	try {
		const nursery = await Nursery.findById(nurseryId);
		return res.json({ success: true, data: nursery });
	} catch (e) {
		return res.send({ success: false, message: e.message });
	}
});

router.post(
	"/",
	body("name").notEmpty(),
	body("location").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Provided information was not valid.",
				data: errors.array(),
			});

		const { name, email, phone, location } = req.body;

		if (!email && !phone)
			return res.json({
				success: false,
				message: "Phone or Email should be provided.",
			});

		const nurseryId = req.user.sub;
		const nursery = await Nursery.findById(nurseryId);

		nursery.name = name;
		nursery.location = location;

		// if email changed
		if (email !== nursery.email) {
			const matchingAccounts = await Nursery.countDocuments({
				email: email,
			});
			if (matchingAccounts > 0)
				return res.json({
					success: false,
					message: "This Email is associated with another account.",
				});
			nursery.email = email;
		}

		// if phone changed
		if (phone !== nursery.phone) {
			const matchingAccounts = await Nursery.countDocuments({
				phone: phone,
			});
			if (matchingAccounts > 0)
				return res.json({
					success: false,
					message: "This Phone is associated with another account.",
				});
			nursery.phone = phone;
		}

		try {
			await nursery.save();
			return res.json({
				success: true,
				message: "Profile updated successfully.",
			});
		} catch (e) {
			return res.send({ success: false, message: e.message });
		}
	}
);

module.exports = router;
