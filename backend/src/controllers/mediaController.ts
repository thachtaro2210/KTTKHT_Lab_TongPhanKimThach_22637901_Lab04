import { Request, Response } from 'express';
import { MediaService } from '../services';

export const uploadMedia = async (req: Request, res: Response) => {
  // @ts-ignore
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file' });
  const url = '/' + (process.env.UPLOAD_DIR || 'uploads') + '/' + file.filename;
  // @ts-ignore
  const uploadedBy = req.user?.userId;
  try {
    const media = MediaService.uploadMedia(file.originalname, url, file.mimetype, file.size, uploadedBy);
    res.status(201).json(media);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const listMedia = async (req: Request, res: Response) => {
  try {
    const items = MediaService.listMedia();
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const success = MediaService.deleteMedia(req.params.id);
    if (!success) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Modified: 2026-03-13T07:37:58.145Z