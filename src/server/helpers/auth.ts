import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from '../../types/user.types.js';
import { IAuthenticatedRequest } from '../../types/express.types.js';

export const authenticateToken = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(403).send({
      message: 'Forbidden, Missing Access Token',
    });
    return;
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    res.status(500).send({
      message: 'Server configuration error',
    });
    return;
  }

  jwt.verify(token, accessTokenSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
    console.log(err);
    if (err) {
      res.status(403).send({ 
        message: 'Forbidden, Invalid access Token' 
      });
      return;
    }
    req.user = decoded as ITokenPayload;
    next();
  });
};

export const generateAccessToken = (user: any): string => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }
  return jwt.sign(user, accessTokenSecret, { expiresIn: 86400 });
};