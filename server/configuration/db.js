var mongoose = require("mongoose");
const userModel = require("../models/userModel");

var chalk = require("chalk");

//require database URL from properties file
var dbURL = process.env.MONGO_URI;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

const defaultList = {
	email: process.env.ADMIN_EMAIL,
	password: process.env.ADMIN_PASSWORD,
	userType: "ADMIN",
};

module.exports = () => {
	mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});

	mongoose.connection.once("open", () => {
		userModel
			.find({ userType: "ADMIN", isActive: true })
			.count(async function (err, count) {
				try {
					if (err) {
						console.log(err);
					}
					if (!err && !count) {
						const user = new userModel(defaultList);
						await user.save();
					}
				} catch (error) {
					console.log(error);
				}
			});
	});

	mongoose.connection.on("connected", function () {
		console.log(connected("Mongoose default connection is open to ", dbURL));
	});

	mongoose.connection.on("error", function (err) {
		console.log(
			error("Mongoose default connection has occured " + err + " error")
		);
	});

	mongoose.connection.on("disconnected", function () {
		console.log(disconnected("Mongoose default connection is disconnected"));
	});

	process.on("SIGINT", function () {
		mongoose.connection.close(function () {
			console.log(
				termination(
					"Mongoose default connection is disconnected due to application termination"
				)
			);
			process.exit(0);
		});
	});
};
