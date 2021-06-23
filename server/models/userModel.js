const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      AutoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: String,
      unique: true,
    },

    firstName:String,

    password: {
      type: String,
      trim: true,
    },

    userImage: String,

    userType: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    mobileNumber: {
      type: String,
      unique: true,
    },

    Address: {
      type: String,
    },
    Description: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1000 });

UserSchema.statics.findUserByEmail = async function (email, mobileNumber,_id) {
  let queryObj={}
  if(mobileNumber){
    queryObj={ $or: [{ email }, { mobileNumber }]}
  }else{
    queryObj={email}
  }

  if(_id){
    queryObj._id={$ne:_id}
  }
  // const user = await this.findOne({ email });
  const user = await this.findOne(queryObj)
    .select(
      "email mobileNumber Address  isActive created_at userId Description"
    )
    .lean(true)
    .exec();
  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  // console.log(user.isModified('password'));

  if (!user.isModified("password")) return next();
  // if (user.isModified("password")) {
  // console.log("pass", user.password);

  var salt = await bcrypt.genSalt(10);
  // console.log(salt, "1");

  var hash = await bcrypt.hash(user.password, salt);

  // console.log(hash);

  user.password = hash;
  // console.log(user.password);

  next();
});
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   console.log(user.isModified("password"));

//   if (!user.isModified("password")) return next();
//   // if (user.isModified("password")) {
//   console.log("pass", user.password);

//   await bcrypt.genSalt(10, async function (err, salt) {
//     console.log(salt, "1");

//     if (err) return next(err);
//     await bcrypt.hash(user.password, salt, async function (err, hash) {
//       console.log(salt, "2");

//       if (err) return next(err);
//       console.log(hash);

//       user.password = hash;
//       // console.log(user.password.length);
//       // if (user.password.length > 30) {
//       //   next();
//       // } else {
//       //   console.log("struvk");
//       // }
//     });
//   });
//   // }
// });

UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
