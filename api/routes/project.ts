import { Router } from 'express';
import { list, add, edit } from '../controllers/project';
import newValidator from '../validators/project/add';
import editValidator from '../validators/project/edit';

const router = Router();

router.get('/', list);
router.put('/', newValidator, add);
router.post('/:id', editValidator, edit);

export default router;
