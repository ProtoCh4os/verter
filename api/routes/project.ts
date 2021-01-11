import { Router } from 'express';
import { list } from '../controllers/project';

const router = Router();

router.get('/', list);

export default router;
