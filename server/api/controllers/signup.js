var Services = require("../../services/network");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const { signUpSchema } = require("../../services/hapiJoi");

const _signup = async (req, res, next) => {
  try {
    let result = signUpSchema.validate(req.body);

    if (result.error) {
      return Services._validationError(
        res,
        result.error.details[0].message,
        "Error in signup"
      );
    }
    

    let user = await userModel.findUserByEmail(
      req.body.email,
      req.body.mobileNumber
    );

    if (user) {
      return Services._validationError(
        res,
        user.email == req.body.email
          ? "Email ID is already registered"
          : "Mobile No already registered",
        user.email == req.body.email
          ? "Email ID is already registered"
          : "Mobile No already registered"
      );
    }

    delete req.body.confirmPassword;

    user = new userModel(req.body);

    user = await user.save();

    

    const userToken = await jwt.sign(
      { userData: user._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const userData = user.toObject();
		delete userData.password;

    Services._response(
			res,
			{
				token: userToken,
				user:userData,
			},
			"Registered successfully"
		);
  } catch (error) {
    return Services._validationError(res, error, "Error in _getUsers");
  }
};

module.exports = { _signup };
