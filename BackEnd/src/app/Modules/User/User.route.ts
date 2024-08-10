import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './User.validation';
import { UserControllers } from './User.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.addUserSchema),
  UserControllers.createUser,
);

router.get('/:id', UserControllers.getSingleUser);

router.get('/', UserControllers.getAllUsers);

router.patch(
  '/:userId',
  validateRequest(UserValidation.updateUserSchema),
  UserControllers.updateUser,
);

router.delete('/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
