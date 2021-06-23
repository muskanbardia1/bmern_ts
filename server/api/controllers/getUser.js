const UserModel = require("../../models/userModel");
var Services = require("../../services/network");

const _getUser = async (req, res) => {
  try {
    // let { page = 1, limit = 20, sort = null } = req.body;

    let queryObj = {};
    if (req.userType == "USER") {
      queryObj._id = req.id;
      queryObj.isActive = true;
    } else {
      if (!req.body.email) {
        return Services._validationError();
      }
      queryObj.email = req.body.email;
    }

    let user = await UserModel.findOne({ queryObj })
      .select(
        "email mobileNumber Address  isActive created_at userId Description userImage"
      )
      .lean(true)
      .exec();

    Services._response(
      res,

      user,

      "Users fetched successfully"
    );
  } catch (error) {
    return Services._validationError(res, error, "Error in _getUsers");
  }
};
module.exports = { _getUser };
