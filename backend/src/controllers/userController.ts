import { Request, Response } from 'express';
import { UserService } from '../services';
import * as db from '../data/db';

export const listUsers = async (req: Request, res: Response) => {
  // @ts-ignore
  const requester = req.user?.userId;
  const user = db.findById('users', requester);
  if (!user?.roles?.includes('admin')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const users = UserService.listUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const requester = req.user?.userId;
  const user = db.findById('users', requester);
  if (!user?.roles?.includes('admin')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const { roles } = req.body;
  try {
    const target = UserService.updateUser(req.params.id, roles);
    res.json(target);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const requester = req.user?.userId;
  const user = db.findById('users', requester);
  if (!user?.roles?.includes('admin')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const success = UserService.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
