const UserModel = require("../../models/userModel");
var Services = require("../../services/network");

const _getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 20, sort = null } = req.body;

   
    let user = await UserModel.find({ userType: "USER",isActive:true })
			.select("email mobileNumber Address  created_at userId lastName firstName userImage")
			.lean(true)
			.skip((page - 1) * limit)
			.limit(limit * 1)
			.sort({ isActive: -1, created_at: -1 })
			.exec();
     

    Services._response(
      res,
      
        user
       
      ,
      "Users fetched successfully"
    );
  } catch (error) {
    return Services._validationError(res, error, "Error in _getUsers");
  }
};
module.exports = { _getUsers };
