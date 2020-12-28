const express = require("express");
const { body, validationResult } = require("express-validator");
const jsonwebtoken = require("jsonwebtoken");

const Nursery = require("../../models/mongoose/nursery");
const { hash, verify } = require("../../models/password");

const router = express.Router();

router.get(
	"/sign-up",
	body("name").notEmpty(),
	body("location").notEmpty(),
	body("email").isEmail(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid",
				data: errors.array(),
			});

		const { name, email, password, location } = req.body;
		const nursery = new Nursery({
			name,
			email,
			password: await hash(password),
			location,
		});
		try {
			await nursery.save();
			return res.json({
				success: true,
			});
		} catch (e) {
			return res.json({
				success: false,
				message: e.message,
			});
		}
	}
);

router.get(
	"/sign-in",
	body("email").isEmail(),
	body("password").isLength({ min: 5 }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.json({
				success: false,
				message: "Information is not valid",
				data: errors.array(),
			});

		const { email, password } = req.body;

		const nursery = await Nursery.findOne({ email: email });
		if (!nursery)
			return res.json({
				success: false,
				message: "No Nursery was found with this email",
			});

		const passwordGood = await verify(password, nursery.password);
		if (!passwordGood)
			return res.json({
				success: false,
				message: "Password is wrong",
			});

		try {
			const token = jsonwebtoken.sign(
				{
					userType: "nursery",
					sub: nursery._id,
				},
				process.env.SECRET,
				{
					expiresIn: "30 days",
				}
			);
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
