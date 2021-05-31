const express = require("express");
const { body, validationResult } = require("express-validator");

const Nursery = require("../../models/mongoose/nursery");
const { hash, verify } = require("../../models/password");
const { createToken } = require("../../models/token");

const router = express.Router();

router.post(
	"/sign-up",
	body("name").notEmpty(),
	body("location").notEmpty(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid.",
				data: errors.array(),
			});

		const { name, email, phone, password, location } = req.body;

		if (!email && !phone)
			return res.json({
				success: false,
				message: "Phone or Email should be provided.",
			});

		const matchingAccountsEmail = await Nursery.countDocuments({
			email: email,
		});
		const matchingAccountsPhone = await Nursery.countDocuments({
			phone: phone,
		});

		if (matchingAccountsEmail > 0 || matchingAccountsPhone > 0)
			return res.json({
				success: false,
				message: "This Email/Phone is associated with another account.",
			});

		const nursery = new Nursery({
			name,
			email,
			phone,
			password: await hash(password),
			location,
		});
		try {
			await nursery.save();
			return res.json({
				success: true,
				message: "Nursery created successfully.",
			});
		} catch (e) {
			return res.json({
				success: false,
				message: e.message,
			});
		}
	}
);

router.post(
	"/sign-in",
	body("username").notEmpty(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid.",
				data: errors.array(),
			});

		const { username, password } = req.body;

		const nursery = await Nursery.findOne({
			$or: [{ email: username }, { phone: username }],
		});

		if (!nursery)
			return res.json({
				success: false,
				message: "No Nursery was found with this username.",
			});

		const passwordGood = await verify(password, nursery.password);
		if (!passwordGood)
			return res.json({
				success: false,
				message: "Password is wrong.",
			});

		try {
			const token = createToken("nursery", nursery);
			return res.json({
				success: true,
				data: token,
			});
		} catch (e) {
			return res.json({
				success: false,
				message: e.message,
			});
		}
	}
);

module.exports = router;
