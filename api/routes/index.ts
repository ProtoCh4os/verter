import session from './session';
import { Router } from 'express';

const router = Router();

router.use('/login', session);

export default router;
