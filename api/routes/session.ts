import { Router } from 'express';
import { login } from '../controllers/login';
import validator from '../validators/login';

const router = Router();

router.post('/', validator, login);

export default router;
