import express, { Request, Response } from 'express';
import * as userController from '../Controllers/user.controller.js';
import { authenticateToken } from '../helpers/auth.js';

const router = express.Router();

// Default Route
router.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Grocery-api',
    author: 'kallyas',
    version: '1.0.0',
  });
});

// get all users
router.get('/users', userController.getUsers);

// create User
router.post('/auth/signup', userController.createUser);

// delete user by Id
router.delete('/user/:id', authenticateToken, userController.deleteUser);

// update User by Id
router.put('/user/:id', authenticateToken, userController.updateUser);

// view user
router.get('/user/:id', authenticateToken, userController.findUserById);

// login
router.post('/auth/login', userController.Login);

export default router;