var Services = require("../services/network");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = function authorization(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
 

  return [
    async (req, res, next) => {
      // console.log(req.headers,"header");
      // var bearerHeader =  req.headers["authorization"]  || req.query["api_key"];
      // console.log(bearerHeader);

      let token = req.headers["authorization"];
      
      if (!token ) {
        return Services._validationError(res, "No token,authorization failed");
      }
      try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userData;
        let data = await User.findOne({
          _id: req.id,
          userType: { $in: roles },
          isActive: true,
        })
          .select("-userImage")
          .lean(true).exec()

        if (!data) {
          return Services._validationError(
            res,
            `Unauthorized access`
          );
        }
        req.userType = data.userType;
        req.user = data;

        next();
      } catch (error) {
        Services._handleError(
          res,
          "Session expired , please login again",
          "Token is not valid"
        );
      }
    },
  ];
};
