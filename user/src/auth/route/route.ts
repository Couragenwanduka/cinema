import express from 'express';
import UserController from '../controller';
import { validator } from '../../middleware/validation';
import { signUpSchema, loginSchema } from '../schema';
import { authorization } from '../../middleware/authorise';

const router = express.Router();
const userController = new UserController();

// User signup
router.post('/', [validator(signUpSchema)], userController.signup.bind(userController));

// User login
router.post('/login', [validator(loginSchema)],userController.login.bind(userController));

// User update details
router.patch('/:id', authorization,userController.updateUserDetails.bind(userController));

// User delete
router.delete('/:id', authorization, userController.deleteUser.bind(userController));

export default router;