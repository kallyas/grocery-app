const express = require("express");
const router = express.Router();

//require controllers
const userController = require("../controllers/user.controller");

//test the route
router.get("/test", userController.test);

//create route
router.post("/create", userController.userCreate);

//get end point
router.get("/:id", userController.userDetails);

//update endpoint
router.put("/:id/update", userController.userUpdate);

// delete end point
router.delete("/:id/delete", userController.userDelete);

//get all users
router.get("/", userController.allUsers);

//export the module
module.exports = router;