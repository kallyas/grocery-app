const Profile = require("../Models/profile.model");

module.exports.getProfiles = async (req, res, next) => {
  try {
    //   https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu
    const results = await Profile.find({}, { __v: 0 })
      .select("-password")
      .populate("details");
    if (!results.length)
      return res.status(404).send({ message: "No user profiles found!" });
    res.send(results);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
