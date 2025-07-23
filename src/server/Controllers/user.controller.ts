import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../Models/user.model.js';
import { signUpCheck, loginCheck } from '../helpers/validation.js';
import { generateAccessToken } from '../helpers/auth.js';
import { ControllerFunction, IAuthenticatedRequest } from '../../types/express.types.js';
import { IUserCreateRequest, IUserLoginRequest } from '../../types/user.types.js';

dotenv.config();

// create a user
export const createUser: ControllerFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body as IUserCreateRequest;
    const { error } = signUpCheck(userData);
    
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) {
      res.status(400).send({ message: 'Username already taken! ' });
      return;
    }

    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
      res.status(400).send({ message: 'Email already exists' });
      return;
    }

    const user = new User(userData);
    const result = await user.save();
    
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error('SECRET environment variable is not defined');
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ 
      message: 'User created successfully', 
      token: token 
    });
  } catch (error) {
    console.log((error as Error).message);
    if ((error as any).name === 'ValidationError') {
      next(createError(422, (error as Error).message));
      return;
    }
    next(error);
  }
};

export const findUserById: ControllerFunction = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({
        status: 404,
        message: 'User Does not Exist',
      });
      return;
    }
    res.send(user);
  } catch (error) {
    console.log((error as Error).message);
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({
        status: 400,
        Message: 'Bad Request, Invalid User Id',
      });
      return;
    }
    next(error);
  }
};

export const updateUser: ControllerFunction = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updates, options);
    if (!result) {
      res.status(404).json({
        status: 404,
        Message: 'Not Found, User does not exist',
      });
      return;
    }
    res.send(result);
  } catch (error) {
    console.log((error as Error).message);
    if (error instanceof mongoose.Error.CastError) {
      next(createError(400, 'Invalid User Id'));
      return;
    }
    next(error);
  }
};

export const deleteUser: ControllerFunction = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({
        status: 404,
        Message: 'Not Found, User does not exist',
      });
      return;
    }
    res.send(result);
  } catch (error) {
    console.log((error as Error).message);
    if (error instanceof mongoose.Error.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(error);
  }
};

export const getUsers: ControllerFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu
    const results = await User.find({}, { __v: 0 })
      .select('-password')
      .populate('questions');
      
    if (!results.length) {
      res.status(404).send({ message: 'No users found!' });
      return;
    }
    res.send(results);
  } catch (error) {
    console.log((error as Error).message);
    next(error);
  }
};

export const Login: ControllerFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loginData = req.body as IUserLoginRequest;
    
    // check whether the user exists
    const { error } = loginCheck(loginData);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    const user = await User.findOne({ username: loginData.username });
    if (user) {
      // compare passwords using Bcrypt
      const result = await bcrypt.compare(loginData.password, user.password);
      if (result) {
        const token = generateAccessToken(loginData);
        res.send({ message: 'logged In', token: token });
      } else {
        res.send({ message: 'Passwords did not match!' });
      }
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  } catch (error) {
    next(error);
  }
};