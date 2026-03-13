import { Router } from 'express';
import * as ctrl from '../controllers/commentsController';
import { requireAuth } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.get('/contents/:contentId/comments', ctrl.listComments);
router.post('/contents/:contentId/comments', requireAuth, ctrl.addComment);
router.delete('/comments/:id', requireAuth, ctrl.deleteComment);

export default router;

// Modified: 2026-03-13T07:37:58.662Z