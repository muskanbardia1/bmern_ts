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

    let user;
    if (req.userType == "ADMIN") {
      if (!req.body.userId ) {
        return Services._validationError(
          res,
          "Provide userId",
          "Provide userId"
        );
      }
      delete req.body.userId;

      user = await userModel
        .findByIdAndUpdate(req.body.userId, req.body, { new: true })
        .exec();
    } else {
      delete req.body.userId;
      user = await userModel.findByIdAndUpdate(req.id, req.body,{new:true}).exec();
    }

    Services._response(res, {user}, "Upadted successfully");
  } catch (error) {
    return Services._validationError(res, error, "Error in editUser");
  }
};

module.exports = { _editUser };
