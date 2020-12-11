import session from './session';
import { Router } from 'express';

const router = Router();

router.use('/session', session);

export default router;
