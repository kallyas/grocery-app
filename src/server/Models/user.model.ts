import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../types/user.types.js';

// email validation credit: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax/28396238
const validateEmail = (email: string): boolean => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    set: (value: string): string => {
      return bcrypt.hashSync(value, 10);
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    max: 10,
  },
  userLevel: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userType: {
    type: String,
    default: 'user',
  },
});

// create search index
UserSchema.index({ '$**': 'text' });

// export the model
const User = model<IUser>('User', UserSchema);
export default User;