var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("./models/db");
const Nursery = require("./models/mongoose/nursery");
var nurseryRouter = require("./routes/nursery");

var app = express();

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "some-cool-secret",
		},
		async (payload, done) => {
			const userType = payload.userType;
			if (userType === "nursery") {
				const nursery = await Nursery.findById(payload.sub);
				if (nursery) return done(null, nursery);
			}
			return done(null, false);
		}
	)
);
passport.serializeUser((user, cb) => {
	cb(null, {
		id: user._id,
		type: user instanceof Nursery ? "nursery" : "user",
	});
});

passport.deserializeUser(async ({ id, type }, cb) => {
	let user;
	if (type === "nursery") {
		user = await Nursery.findById(id);
	}
	cb(null, user);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(passport.initialize());

app.use("/nursery", nurseryRouter);

module.exports = app;
