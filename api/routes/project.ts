import { Router } from 'express';
import { list, add, edit, details } from '../controllers/project';
import objectId from '../validators/objectId';
import newValidator from '../validators/project/add';
import editValidator from '../validators/project/edit';

const router = Router();

router.get('/', list);
router.put('/', newValidator, add);
router.post('/:id', objectId('params', 'id'), editValidator, edit);
router.get('/:id', objectId('params', 'id'), details);

export default router;
