import { Plugin, PluginAPI } from '../core/plugin-loader';
import * as db from '../data/db';

export const MediaPlugin: Plugin = {
  name: 'media',
  version: '1.0.0',
  init(api: PluginAPI) {
    api.logger.log('Media plugin initialized');
  },
  hooks: {
    listMedia() {
      return db.getAll('media').sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },

    uploadMedia(filename: string, url: string, mimeType: string, size: number, uploadedBy: string) {
      return db.insert('media', {
        filename,
        url,
        mimeType,
        size,
        uploadedBy
      });
    },

    deleteMedia(id: string) {
      return db.remove('media', id);
    }
  }
};

// Modified: 2026-03-13T07:37:58.145Z