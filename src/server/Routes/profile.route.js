const express = require("express");
const router = express.Router();

const profileController = require("../Controllers/profile.controller");

router.get("/profiles", profileController.getProfiles);

module.exports = router;
