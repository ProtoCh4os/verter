import { Router } from 'express';
import session from './session';
import project from './project';

const router = Router();

router.use('/session', session);
router.use('/project', project);

export default router;
