const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./user.model");

const ProfileSchema = new Schema({
  details: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profileImage: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  rating: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
