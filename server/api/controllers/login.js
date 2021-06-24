var Services = require("../../services/network");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const { loginSchema } = require("../../services/hapiJoi");

const _login = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return res.send("success")
    let result = loginSchema.validate(req.body);

    if (result.error) {
      return Services._validationError(
        res,
        result.error.details[0].message,
        "Error in Login"
      );
    }
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findUserByEmail(email);

    if (!user || !user.isActive) {
      return Services._validationError(
        res,
        user ? "user is deactivated" : "Email ID is not registered",
        user ? "user is deactivated" : "Email ID is not registered"
      );
    }

    const isMatch = await user.isPasswordMatch(password);

    if (!isMatch) {
      return Services._validationError(
        res,
        "Password incorrect",
        "Password incorrect"
      );
    }

    const userToken = await jwt.sign(
      { userData: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const userData=user.toObject()
    delete userData.password

    Services._response(
      res,
      {
        token:userToken,
         user:userData,
      },
      "Login successfully"
    );
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return Services._validationError(res, error, "Error in _getUsers");
  }
};

module.exports = { _login };
