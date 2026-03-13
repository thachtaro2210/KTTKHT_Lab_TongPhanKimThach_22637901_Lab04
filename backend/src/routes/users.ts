import { Router } from 'express';
import * as ctrl from '../controllers/userController';
import { requireAuth } from '../middlewares/auth';

const router = Router();
router.get('/', requireAuth, ctrl.listUsers);
router.put('/:id', requireAuth, ctrl.updateUser);
router.delete('/:id', requireAuth, ctrl.deleteUser);

export default router;
