import { Plugin, PluginAPI } from '../core/plugin-loader';
import * as db from '../data/db';

export const CommentsPlugin: Plugin = {
  name: 'comments',
  version: '1.0.0',
  init(api: PluginAPI) {
    api.logger.log('Comments plugin initialized');
  },
  hooks: {
    listCommentsByContent(contentId: string) {
      const comments = db.getAll('comments');
      return comments
        .filter((c: any) => c.contentId === contentId)
        .sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },

    addComment(contentId: string, author: string, authorName: string, body: string) {
      return db.insert('comments', {
        contentId,
        author,
        authorName,
        body
      });
    },

    deleteComment(id: string) {
      return db.remove('comments', id);
    }
  }
};

// Modified: 2026-03-13T07:37:58.661Z