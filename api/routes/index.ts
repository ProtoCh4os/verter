import { Router } from 'express';

const router = Router();

router.get('*', (_req, res) => {
  return respondSuccess(res);
});

export default router;
