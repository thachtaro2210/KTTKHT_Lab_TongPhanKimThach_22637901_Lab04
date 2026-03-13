import { Router } from 'express';
import { login, register, me } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

export default router;

// Modified: 2026-03-13T07:37:55.342Z