var Services = require("../../services/network");
const userModel = require("../../models/userModel");
const { editUserSchema } = require("../../services/hapiJoi");

const _editUser = async (req, res, next) => {
  try {
    let result = editUserSchema.validate(req.body);

    if (result.error) {
      return Services._validationError(
        res,
        result.error.details[0].message,
        "Error in edit user"
      );
    }

   

      let user = await userModel
				.findByIdAndUpdate(
					req.body.userId || req.id,
					{
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						userImage: req.body.userImage,
						mobileNumber: req.body.mobileNumber,
						Address: req.body.Address,
						Description: req.body.Description,
					},
					{ new: true }
				)
				.exec();
    

    Services._response(res, {user}, "Upadted successfully");
  } catch (error) {
    return Services._validationError(res, error, "Error in editUser");
  }
};

module.exports = { _editUser };
