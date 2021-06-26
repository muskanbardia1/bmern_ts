const UserModel = require("../../models/userModel");
var Services = require("../../services/network");

const _deleteUser = async (req, res) => {
	try {
		// let { page = 1, limit = 20, sort = null } = req.body;
		if (req.userType == "USER") {
			return Services._validationError(res, "Please provide the id");
		}

		if (!req.query._id || !req.query._id?.trim()) {
			return Services._validationError(res, "Please provide the id");
		}

		let user = await UserModel.findByIdAndUpdate(req.query._id, {
			isActive: false,
		}).exec();

		Services._response(
			res,

			"User deleted successfully",

			"User deleted successfully"
		);
	} catch (error) {
		return Services._validationError(res, error, "Error in _deleteUser");
	}
};
module.exports = { _deleteUser };
