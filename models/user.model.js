const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
});

//export the model
module.exports = mongoose.model("User", UserSchema);
