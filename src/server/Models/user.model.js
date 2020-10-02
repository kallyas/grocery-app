const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// email validation credit: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax/28396238
let validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    set: (value) => {
      return bcrypt.hashSync(value, 10);
    },
  },

  phoneNumber: {
    type: String,
    required: true,
    max: 10,
  },
  userLevel: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userType: {
    type: String,
    default: "user",
  },
});

// create search index
UserSchema.index({ "$**": "text" });
//export the model
module.exports = mongoose.model("User", UserSchema);
