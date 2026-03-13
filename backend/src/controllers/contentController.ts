import { Request, Response } from 'express';
import { ContentService } from '../services';
import * as db from '../data/db';

export const listContents = async (req: Request, res: Response) => {
  try {
    const contents = ContentService.listContents();
    // Populate author info
    const populated = contents.map((c: any) => {
      const author = db.findById('users', c.author);
      return {
        ...c,
        author: author ? { _id: author._id, name: author.name, email: author.email } : null
      };
    });
    res.json(populated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const content = ContentService.getContent(req.params.id);
    if (!content) return res.status(404).json({ message: 'Not found' });
    // Populate author
    const author = db.findById('users', content.author);
    const populated = {
      ...content,
      author: author ? { _id: author._id, name: author.name, email: author.email } : null
    };
    res.json(populated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createContent = async (req: Request, res: Response) => {
  const { title, slug, body, tags } = req.body;
  // @ts-ignore
  const author = req.user?.userId;
  try {
    const content = ContentService.createContent(title, slug, body, tags || [], author);
    res.status(201).json(content);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  const { title, slug, body, tags, status } = req.body;
  // @ts-ignore
  const author = req.user?.userId;
  try {
    const content = ContentService.updateContent(req.params.id, {
      title, slug, body, tags, status, author
    });
    res.json(content);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const success = ContentService.deleteContent(req.params.id);
    if (!success) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const publishContent = async (req: Request, res: Response) => {
  try {
    const content = ContentService.publishContent(req.params.id);
    res.json(content);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
