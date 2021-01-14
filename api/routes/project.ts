import { Router } from 'express';
import {
  list as listProjects,
  add as addProject,
  edit as editProject,
  details as detailsProject,
} from '../controllers/project';
import { add as AddVersion } from '../controllers/version';
import newProjectValidator from '../validators/project/add';
import editProjectValidator from '../validators/project/edit';

import newVersionValidator from '../validators/project/version/add';

const router = Router();

router.get('/', listProjects);
router.put('/', newProjectValidator, addProject);

router.post('/:id', editProjectValidator, editProject);
router.get('/:id', detailsProject);

router.put('/:id/version', newVersionValidator, AddVersion);

export default router;
