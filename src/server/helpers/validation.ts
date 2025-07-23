import Joi from 'joi';
import { IUserCreateRequest, IUserLoginRequest } from '../../types/user.types.js';

// validate signup fields
export const signUpCheck = (data: IUserCreateRequest): Joi.ValidationResult => {
  const validateSchema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
    phoneNumber: Joi.string().optional(),
    userLevel: Joi.number().optional(),
    userType: Joi.string().optional(),
  });
  return validateSchema.validate(data);
};

// validate login fields
export const loginCheck = (data: IUserLoginRequest): Joi.ValidationResult => {
  const validateSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });
  return validateSchema.validate(data);
};