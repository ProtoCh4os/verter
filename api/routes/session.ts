import { Router } from 'express';
import { login, logout } from '../controllers/login';
import validator from '../validators/login';

const router = Router();

router.post('/logout', logout);
router.post('/login', validator, login);

export default router;
