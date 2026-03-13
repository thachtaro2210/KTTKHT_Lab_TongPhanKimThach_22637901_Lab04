import { Plugin, PluginAPI } from '../core/plugin-loader';
import * as db from '../data/db';

export const UserPlugin: Plugin = {
  name: 'user',
  version: '1.0.0',
  init(api: PluginAPI) {
    api.logger.log('User plugin initialized');
  },
  hooks: {
    listUsers() {
      return db.getAll('users').map((u: any) => {
        const { passwordHash, ...user } = u;
        return user;
      });
    },

    getUserById(id: string) {
      const user = db.findById('users', id);
      if (!user) return null;
      const { passwordHash, ...safe } = user;
      return safe;
    },

    updateUser(id: string, roles: string[]) {
      return db.update('users', id, { roles });
    },

    deleteUser(id: string) {
      return db.remove('users', id);
    }
  }
};
