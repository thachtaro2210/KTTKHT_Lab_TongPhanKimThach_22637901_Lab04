import { Router } from 'express';
import authRoutes from './auth';
import contentRoutes from './content';
import mediaRoutes from './media';
import usersRoutes from './users';
import commentsRoutes from './comments';

const router = Router();
router.use('/auth', authRoutes);
router.use('/contents', contentRoutes);
router.use('/media', mediaRoutes);
router.use('/users', usersRoutes);
router.use('/', commentsRoutes);

export default router;
