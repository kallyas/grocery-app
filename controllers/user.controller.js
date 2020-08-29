const User = require("../models/user.model");

// testing
exports.test = (req, res) => {
  res.send("greetings from testcontroller");
};

exports.userCreate = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    userLevel: 1,
  });
  user.save((err) => {
    if (err) return next(err);
    res.send({
      status: 200,
      message: "user created success fully!",
    });
  });
};

// get user by Id
exports.userDetails = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.send(user);
  });
};

// update user by Id
exports.userUpdate = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return next(err);
    res.send({
      status: 200,
      message: "user udpated.",
    });
  });
};

// delete a user by ID
exports.userDelete = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.send({
      status: 200,
      message: "Deleted successfully!",
    });
  });
};

//get all users
exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.send(users);
    console.log(users.length);
  });
};
