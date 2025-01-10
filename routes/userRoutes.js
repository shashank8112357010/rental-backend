import express from 'express';
import { changePassword, createUser, loginUser } from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/change-password', authenticate, changePassword);




export default router;