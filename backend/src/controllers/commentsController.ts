import { Request, Response } from 'express';
import { getPlugin } from '../core/plugin-loader';

const commentsPlugin = () => getPlugin('comments');

export const listComments = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  try {
    const comments = (commentsPlugin()?.hooks?.listCommentsByContent as any)(contentId);
    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const { body } = req.body;
  // @ts-ignore
  const author = req.user?.userId;
  
  if (!body) return res.status(400).json({ message: 'Comment body required' });

  try {
    // Get user info for authorName
    const db = require('../data/db');
    const user = db.findById('users', author);
    const authorName = user?.name || 'Anonymous';

    const comment = (commentsPlugin()?.hooks?.addComment as any)(
      contentId,
      author,
      authorName,
      body
    );
    res.status(201).json(comment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  // @ts-ignore
  const userId = req.user?.userId;
  
  try {
    const db = require('../data/db');
    const comment = db.findById('comments', id);
    
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    // Only allow deleting own comments or admin delete
    // @ts-ignore
    if (comment.author !== userId && !req.user?.roles?.includes('admin')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const success = (commentsPlugin()?.hooks?.deleteComment as any)(id);
    if (!success) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
