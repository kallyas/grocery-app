const express = require("express");
const router = express.Router();
require("../config/cloudinary.config")
const auth = require("../helpers/auth");
const profileController = require("../Controllers/profile.controller");
const upload = require("../helpers/multer");

router.get("/profiles", profileController.viewProfiles);
router.post(
  "/profiles/create",
  upload.single("image"),
  profileController.createProfile
);
router.get(
  "/profiles/:profileId",
  auth.authenticateToken,
  profileController.viewProfileById
);
router.get(
  "/profiles/user/:profileId",
  auth.authenticateToken,
  profileController.viewProfileByUserId
);
router.delete(
  "/profiles/:profileId",
  auth.authenticateToken,
  profileController.deleteProfile
);
router.post(
  "/profiles/:profileId",
  auth.authenticateToken,
  profileController.updateProfile
);

module.exports = router;
