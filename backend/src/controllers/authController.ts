import { Request, Response } from 'express';
import { AuthService } from '../services';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await AuthService.register(name, email, password);
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.login(email, password);
    res.json({ token: result.token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const user = await AuthService.verifyToken(req.headers.authorization?.split(' ')[1] || '');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Modified: 2026-03-13T07:37:55.915Z