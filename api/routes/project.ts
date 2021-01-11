import { Router } from 'express';
import { list, add } from '../controllers/project';
import newValidator from '../validators/project/new';

const router = Router();

router.get('/', list);
router.put('/', newValidator, add);

export default router;
