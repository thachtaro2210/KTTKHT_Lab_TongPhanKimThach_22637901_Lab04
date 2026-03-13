import { getPlugin } from '../core/plugin-loader';

const authPlugin = () => getPlugin('auth');
const contentPlugin = () => getPlugin('content');
const mediaPlugin = () => getPlugin('media');
const userPlugin = () => getPlugin('user');

// Auth Service
export const AuthService = {
  async register(name: string, email: string, password: string) {
    return (authPlugin()?.hooks?.register as any)(name, email, password);
  },

  async login(email: string, password: string) {
    return (authPlugin()?.hooks?.login as any)(email, password);
  },

  verifyToken(token: string) {
    return (authPlugin()?.hooks?.verifyToken as any)(token);
  }
};

// Content Service
export const ContentService = {
  listContents() {
    return (contentPlugin()?.hooks?.listContents as any)();
  },

  getContent(id: string) {
    return (contentPlugin()?.hooks?.getContent as any)(id);
  },

  createContent(title: string, slug: string, body: string, tags: string[], author: string) {
    return (contentPlugin()?.hooks?.createContent as any)(title, slug, body, tags, author);
  },

  updateContent(id: string, updates: any) {
    return (contentPlugin()?.hooks?.updateContent as any)(id, updates);
  },

  deleteContent(id: string) {
    return (contentPlugin()?.hooks?.deleteContent as any)(id);
  },

  publishContent(id: string) {
    return (contentPlugin()?.hooks?.publishContent as any)(id);
  }
};

// Media Service
export const MediaService = {
  listMedia() {
    return (mediaPlugin()?.hooks?.listMedia as any)();
  },

  uploadMedia(filename: string, url: string, mimeType: string, size: number, uploadedBy: string) {
    return (mediaPlugin()?.hooks?.uploadMedia as any)(filename, url, mimeType, size, uploadedBy);
  },

  deleteMedia(id: string) {
    return (mediaPlugin()?.hooks?.deleteMedia as any)(id);
  }
};

// User Service
export const UserService = {
  listUsers() {
    return (userPlugin()?.hooks?.listUsers as any)();
  },

  getUserById(id: string) {
    return (userPlugin()?.hooks?.getUserById as any)(id);
  },

  updateUser(id: string, roles: string[]) {
    return (userPlugin()?.hooks?.updateUser as any)(id, roles);
  },

  deleteUser(id: string) {
    return (userPlugin()?.hooks?.deleteUser as any)(id);
  }
};

// Modified: 2026-03-13T07:37:57.638Z