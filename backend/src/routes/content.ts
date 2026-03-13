import { Router } from 'express';
import * as ctrl from '../controllers/contentController';
import { requireAuth } from '../middlewares/auth';

const router = Router();
router.get('/', ctrl.listContents);
router.get('/:id', ctrl.getContent);
router.post('/', requireAuth, ctrl.createContent);
router.put('/:id', requireAuth, ctrl.updateContent);
router.delete('/:id', requireAuth, ctrl.deleteContent);
router.post('/:id/publish', requireAuth, ctrl.publishContent);

export default router;

// Modified: 2026-03-13T07:37:57.136Z