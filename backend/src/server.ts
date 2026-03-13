import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Load database
import * as db from './data/db';
db.loadDB();

// Load plugins
import { registerPlugin, initializePlugins, PluginAPI } from './core/plugin-loader';
import * as eventBus from './core/event-bus';
import { AuthPlugin } from './plugins/plugin-auth';
import { ContentPlugin } from './plugins/plugin-content';
import { MediaPlugin } from './plugins/plugin-media';
import { UserPlugin } from './plugins/plugin-user';
import { CommentsPlugin } from './plugins/plugin-comments';

// Register plugins
registerPlugin(AuthPlugin);
registerPlugin(ContentPlugin);
registerPlugin(MediaPlugin);
registerPlugin(UserPlugin);
registerPlugin(CommentsPlugin);

// Initialize plugins
const pluginAPI: PluginAPI = {
  eventBus: {
    on: eventBus.on,
    emit: eventBus.emit
  },
  db,
  logger: {
    log: console.log,
    error: console.error
  }
};
initializePlugins(pluginAPI);

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const uploadDirPath = path.join(__dirname, '..', uploadDir);
fs.mkdirSync(uploadDirPath, { recursive: true });
app.use('/' + uploadDir, express.static(uploadDirPath));

// Routes
import apiRouter from './routes';
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 CMS Server running on http://localhost:${PORT}`);
  console.log(`📦 Plugins loaded: Auth, Content, Media, User, Comments`);
  console.log(`💾 Database: File-based JSON (data/)`);
});

// Modified: 2026-03-13T07:37:53.896Z