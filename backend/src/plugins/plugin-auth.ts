import { Plugin, PluginAPI } from '../core/plugin-loader';
import * as db from '../data/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AuthPlugin: Plugin = {
  name: 'auth',
  version: '1.0.0',
  init(api: PluginAPI) {
    api.logger.log('Auth plugin initialized');
  },
  hooks: {
    async register(name: string, email: string, password: string) {
      const exists = db.findOne('users', { email });
      if (exists) throw new Error('Email already in use');
      const passwordHash = await bcrypt.hash(password, 10);
      return db.insert('users', { name, email, passwordHash, roles: ['editor'] });
    },

    async login(email: string, password: string) {
      const user = db.findOne('users', { email });
      if (!user) throw new Error('Invalid credentials');
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new Error('Invalid credentials');
      const token = jwt.sign(
        { userId: user._id, roles: user.roles },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      return { token, user };
    },

    verifyToken(token: string) {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret');
    }
  }
};
