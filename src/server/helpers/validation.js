const joi = require("joi");
// validate signup fields
const signUpCheck = (data) => {
  const validateSchema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
    username: joi.string().min(4).required(),
    email: joi.string().required(),
    password: joi.string().min(4).required(),
      phoneNumber: joi.string().min(10).required(),
    location: joi.string().required(),
  });
  return validateSchema.validate(data);
};

//validate login fields
const loginCheck = (data) => {
  const validateSchema = joi.object({
    username: joi.string().min(4).required(),
    password: joi.string().min(4).required(),
  });
  return validateSchema.validate(data);
};

module.exports.signUpCheck = signUpCheck;
module.exports.loginCheck = loginCheck;
