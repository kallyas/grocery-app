const Profile = require("../Models/profile.model");

module.exports = {
  createProfile: async (req, res) => {
    // To Create A User Profile
    try {
      //check if the User Profile Already Exists
      req.body.username = req.username;
      req.body.user_id = req.userID;
      const user = await Profile.findOne({ username: req.username });
      if (user) {
        //return error
        res.status(409).json({ Error: "User Profile Already Exists" });
      } else {
        const NewProfile = new Profile(req.body);
        const saved = await NewProfile.save();
        res.status(200).json({
          Message: "Your profile was successfully created.",
          Profile: saved,
        });
      }
    } catch (err) {
      //throw an error
      console.log("Error while creating profile", err);
      res.status(403).json({
        error:
          "An unknown server error occured while creating your profile, please retry!",
      });
    }
  },
  viewProfileByUserId: async (req, res) => {
    // To View User Profiles
    try {
      //Get all Profiles
      const profile = await Profile.findOne({ user_id: req.params.userId });
      if (profile) {
        res.status(200).json({ profile });
      } else {
        res.status(404).json({ Message: "Profile Not Found" });
      }
    } catch (err) {
      //throw an error if anything goes wrong
      res.status(417).json({
        Message: `Something Went Wrong. User Profile of Given id >> ${req.params.profileId} << was Not Found `,
        Error: err,
      });
    }
  },
  viewProfileById: async (req, res) => {
    // To View User Profiles
    try {
      //Get all Profiles
      const profile = await Profile.findOne({ _id: req.params.profileId });
      if (profile) {
        res.status(200).json({ profile: profile });
      } else {
        res.status(404).json({ Message: "Profile Not Found" });
      }
    } catch (err) {
      //throw an error if anything goes wrong
      res.status(417).json({
        Message: `Something Went Wrong. User Profile of Given id >> ${req.params.profileId} << was Not Found `,
        Error: err,
      });
    }
  },
  viewProfiles: async (req, res) => {
    // To View User Profiles
    try {
      //Get all Profiles
      const profiles = await Profile.find();
      if (profiles.length <= 0) {
        res.status(404).json({ Message: "No Profiles Available" });
      } else {
        res.status(200).json({ Profiles: profiles });
      }
    } catch (err) {
      //throw an error if anything goes wrong
      res.status(417).json({
        Message: `Something Went Wrong. Profiles Not Found`,
        Error: err,
      });
    }
  },
  updateProfile: async (req, res) => {
    // To Update a User Profile

    try {
      req.body.user_id = req.userID;
      //otherwise update the profile
      const profile = await Profile.findOneAndUpdate(
        { user_id: req.body.user_id },
        { $set: req.body }
      );
      console.log("user_id: ", req.body.user_id);
      console.log("username: ", req.body.username);
      console.log(profile);
      if (profile) {
        return res.status(200).json({ message: "Profile Updated!" });
      } else {
        return res
          .status(404)
          .json({ error: "You do not have a profile yet, update canceled!" });
      }
    } catch (err) {
      //Throw an error Message
      console.log("Error updating profile:", err);
      res.status(417).json({
        error:
          "Unknown server error occured whilte attempting to update your profile.",
      });
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const deleteUser = await Profile.findOneAndDelete({
        _id: req.params.profileId,
      });
      res.status(200).json({
        message: `Profile has been deleted successfully`,
      });
    } catch (error) {
      res.status(400).json({ error: "Profile cannot be deleted.Try again" });
    }
  },
};
