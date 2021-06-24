const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const password = Joi.string().required().max(100).messages({
  "string.base": "password should be string",
  "string.min": "Too short password ",
  "string.max": "Too long password ",
  "string.empty": "password is required",
  "any.required": "password is required",
});
const email = Joi.string()
  .lowercase()
  .max(50)
  .email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "in", "co", "org"],
    },
  })
  .required()
  .messages({
    "string.empty": "Enter valid Email",
    "string.max": "Enter valid Email",
    "any.required": "Enter valid Email",
    "string.email": "Enter valid Email",
  });

const userImage = Joi.string().required().messages({
  "string.base64": "Image must be in base64",
  "binary.max": "max size is 5mb",
  "string.empty": "image can not be empty",
});

const mobileNumber = Joi.string().max(10).required().messages({
  "string.empty": "mobile number is required",
  "string.min": "Too short mobile number ",
  "string.max": "Too long mobile number ",
  "string.base": "mobile number should be string",
  "any.required": "mobile number is required",
});

const Address = Joi.string().required().messages({
  "string.empty": "Address is required",
  "string.min": "Too short Address ",
  "string.max": "Too long Address ",
  "string.base": "Address should be string",
  "any.required": "Address is required",
});

const firstName = Joi.string().required().messages({
  "string.empty": "firstName is required",
  "string.min": "Too short firstName ",
  "string.max": "Too long firstName ",
  "string.base": "firstName should be string",
  "any.required": "firstName is required",
});

const Description = Joi.string().messages({
  "string.empty": "Description is required",
  "string.min": "Too short Description ",
  "string.max": "Too long Description ",
  "string.base": "Description should be string",
  "any.required": "Description is required",
});

const isActive = Joi.boolean().messages({
  "any.required": "isActive is required",
  "boolean.base": " isActive should be boolean",
});

const userId = Joi.string().required().messages({
  "string.empty": "token is required",
  "string.min": "Too short token ",
  "string.max": "Too long token ",
  "string.base": "token should be string",
  "any.required": "token is required",
});
const loginSchema = Joi.object().keys({
  password,
  email,
});

const forgotPasswordSchema = Joi.object().keys({
  email,
});

const resetPasswordSchema = Joi.object().keys({
  password,
});
const changePasswordSchema = Joi.object().keys({
  oldPassword: password,
  newPassword: password,
});

const editUserSchema = Joi.object()
  .keys({
    firstName,
    lastName:firstName,
    email,
    userImage,
    mobileNumber,
    Address,
    Description,
  })
  .unknown(true);

const signUpSchema = Joi.object().keys({
  firstName,
  lastName:firstName,
  email,
  password,
  confirmPassword: Joi.any().valid(Joi.ref("password")).messages({
    "any.only": "Password and Confirm Password not matched",
  }),

  userImage,
  mobileNumber,
  Address,
  Description,
});

module.exports = {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  editUserSchema,
};
