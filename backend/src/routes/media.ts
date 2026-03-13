import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as ctrl from '../controllers/mediaController';
import { requireAuth } from '../middlewares/auth';

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', uploadDir)),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const router = Router();
router.get('/', ctrl.listMedia);
router.post('/', requireAuth, upload.single('file'), ctrl.uploadMedia);
router.delete('/:id', requireAuth, ctrl.deleteMedia);

export default router;
