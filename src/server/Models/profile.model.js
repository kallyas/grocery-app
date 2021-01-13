const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./user.model");

const ProfileSchema = new Schema({
  details: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
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
