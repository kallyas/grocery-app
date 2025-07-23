import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  userLevel: number;
  createdAt: Date;
  userType: string;
}

export interface IUserCreateRequest {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userLevel?: number;
  userType?: string;
}

export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUserResponse {
  username: string;
  email: string;
  phoneNumber?: string;
  userLevel: number;
  createdAt: Date;
  userType: string;
  _id: string;
}

export interface IAuthResponse {
  message: string;
  token: string;
}

export interface ITokenPayload {
  id: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export interface IApiResponse<T = any> {
  status?: number;
  message: string;
  data?: T;
}