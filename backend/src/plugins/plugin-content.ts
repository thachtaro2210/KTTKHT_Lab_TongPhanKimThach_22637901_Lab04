import { Plugin, PluginAPI } from '../core/plugin-loader';
import * as db from '../data/db';

export const ContentPlugin: Plugin = {
  name: 'content',
  version: '1.0.0',
  init(api: PluginAPI) {
    api.logger.log('Content plugin initialized');
  },
  hooks: {
    listContents() {
      return db.getAll('contents').sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },

    getContent(id: string) {
      return db.findById('contents', id);
    },

    createContent(title: string, slug: string, body: string, tags: string[], author: string) {
      const content = db.insert('contents', {
        title,
        slug,
        body,
        status: 'draft',
        author,
        tags,
        versions: [{ body, author, createdAt: new Date() }],
        publishedAt: null
      });
      return content;
    },

    updateContent(id: string, updates: any) {
      const content = db.findById('contents', id);
      if (!content) throw new Error('Not found');
      if (updates.body && updates.body !== content.body) {
        content.versions = content.versions || [];
        content.versions.push({
          body: updates.body,
          author: updates.author,
          createdAt: new Date()
        });
      }
      return db.update('contents', id, updates);
    },

    deleteContent(id: string) {
      return db.remove('contents', id);
    },

    publishContent(id: string) {
      return db.update('contents', id, { status: 'published', publishedAt: new Date() });
    }
  }
};
