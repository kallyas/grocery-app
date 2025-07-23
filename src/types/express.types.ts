import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from './user.types.js';

export interface IAuthenticatedRequest extends Request {
  user?: ITokenPayload;
}

export type ControllerFunction = (
  req: Request | IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface IErrorResponse {
  message: string;
  status?: number;
  stack?: string;
}