import { Router } from 'express';
import requireSession from '../middleware/session';
import session from './session';
import project from './project';

const router = Router();

router.use('/session', session);

router.use(requireSession);

router.use('/project', project);

export default router;
