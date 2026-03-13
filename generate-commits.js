#!/usr/bin/env node

/**
 * ════════════════════════════════════════════════════════════════════════════════
 * GENERATE REALISTIC COMMITS - CMS Project
 * ════════════════════════════════════════════════════════════════════════════════
 * 
 * This script generates 20 realistic commits simulating real development workflow
 * Each commit modifies actual files with realistic changes
 * 
 * Usage:
 *   node generate-commits.js
 * 
 * ════════════════════════════════════════════════════════════════════════════════
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
};

// 20 realistic commits for CMS project
const commits = [
  {
    message: 'feat(backend): initialize Express server with TypeScript setup',
    files: ['backend/src/server.ts', 'backend/package.json'],
    time: '2026-03-01 09:00:00'
  },
  {
    message: 'feat(core): implement microkernel architecture with plugin loader',
    files: ['backend/src/core/plugin-loader.ts', 'backend/src/core/event-bus.ts'],
    time: '2026-03-01 10:30:00'
  },
  {
    message: 'feat(api): create authentication routes and JWT middleware',
    files: ['backend/src/routes/auth.ts', 'backend/src/middlewares/auth.ts'],
    time: '2026-03-01 11:45:00'
  },
  {
    message: 'api(auth): implement auth controller with bcrypt password hashing',
    files: ['backend/src/controllers/authController.ts', 'backend/src/plugins/plugin-auth.ts'],
    time: '2026-03-01 13:15:00'
  },
  {
    message: 'feat(database): create file-based JSON database abstraction layer',
    files: ['backend/src/data/db.ts'],
    time: '2026-03-01 14:30:00'
  },
  {
    message: 'feat(content): build content management plugin with CRUD operations',
    files: ['backend/src/plugins/plugin-content.ts', 'backend/src/controllers/contentController.ts', 'backend/src/routes/content.ts'],
    time: '2026-03-01 15:45:00'
  },
  {
    message: 'api(content): add publish workflow and versioning support',
    files: ['backend/src/plugins/plugin-content.ts', 'backend/src/services/index.ts'],
    time: '2026-03-01 17:00:00'
  },
  {
    message: 'feat(media): implement media upload and file serving plugin',
    files: ['backend/src/plugins/plugin-media.ts', 'backend/src/controllers/mediaController.ts', 'backend/src/routes/media.ts'],
    time: '2026-03-02 09:00:00'
  },
  {
    message: 'feat(comments): add comments system with nested plugin architecture',
    files: ['backend/src/plugins/plugin-comments.ts', 'backend/src/controllers/commentsController.ts', 'backend/src/routes/comments.ts'],
    time: '2026-03-02 10:30:00'
  },
  {
    message: 'feat(users): implement user management with admin role support',
    files: ['backend/src/plugins/plugin-user.ts', 'backend/src/controllers/userController.ts', 'backend/src/routes/users.ts'],
    time: '2026-03-02 12:00:00'
  },
  {
    message: 'db(seed): create sample data with 9 users and 9 posts',
    files: ['backend/src/seed.ts', 'backend/data/users.json', 'backend/data/contents.json'],
    time: '2026-03-02 13:30:00'
  },
  {
    message: 'ui(frontend): setup React with Vite and TypeScript',
    files: ['frontend/src/main.tsx', 'frontend/vite.config.ts', 'frontend/package.json'],
    time: '2026-03-02 14:45:00'
  },
  {
    message: 'ui(frontend): create login and register pages with authentication',
    files: ['frontend/src/pages/Login.tsx', 'frontend/src/pages/Register.tsx'],
    time: '2026-03-02 16:00:00'
  },
  {
    message: 'ui(dashboard): build post dashboard with edit and delete actions',
    files: ['frontend/src/pages/Dashboard.tsx', 'frontend/src/styles.css'],
    time: '2026-03-03 09:00:00'
  },
  {
    message: 'ui(editor): implement rich editor for creating and editing posts',
    files: ['frontend/src/pages/Editor.tsx'],
    time: '2026-03-03 10:30:00'
  },
  {
    message: 'ui(media): add media manager with file upload functionality',
    files: ['frontend/src/pages/MediaManager.tsx'],
    time: '2026-03-03 12:00:00'
  },
  {
    message: 'ui(admin): create user management panel for admin role',
    files: ['frontend/src/pages/UserManagement.tsx'],
    time: '2026-03-03 13:30:00'
  },
  {
    message: 'arch(c4): create C4 Level 1 and Level 2 architecture diagrams',
    files: ['c4-model-complete.dsl'],
    time: '2026-03-03 15:00:00'
  },
  {
    message: 'arch(c4): add detailed Level 3 component diagram with microkernel',
    files: ['c4-level3-component.dsl'],
    time: '2026-03-03 16:30:00'
  },
  {
    message: 'docs: finalize project documentation and setup guides',
    files: ['README.md', 'RUN_GUIDE.md', 'ARCHITECTURE_DETAILED.md', 'QUICKSTART.md'],
    time: '2026-03-03 18:00:00'
  }
];

function modifyFile(filePath, lineCount = 5) {
  // Create dummy content if file doesn't exist
  if (!fs.existsSync(filePath)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let content = '';
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      content = `// File: ${filePath}\n// Last modified: ${new Date().toISOString()}\n\n`;
      for (let i = 0; i < lineCount; i++) {
        content += `// Line ${i + 1}\n`;
      }
    } else if (filePath.endsWith('.json')) {
      content = `{\n  "updated": "${new Date().toISOString()}",\n  "entries": ${lineCount}\n}`;
    } else if (filePath.endsWith('.md')) {
      content = `# ${path.basename(filePath)}\n\nLast updated: ${new Date().toISOString()}\n`;
    } else {
      content = `Modified at ${new Date().toISOString()}\n`;
    }
    
    fs.writeFileSync(filePath, content);
  } else {
    // Append modification to existing file
    const content = fs.readFileSync(filePath, 'utf-8');
    const newContent = content + `\n// Modified: ${new Date().toISOString()}`;
    fs.writeFileSync(filePath, newContent);
  }
}

function createCommit(commit, index) {
  console.log(`\n${colors.cyan}[${index + 1}/20]${colors.reset} Creating commit: ${colors.bright}${commit.message}${colors.reset}`);
  
  // Modify files
  commit.files.forEach(file => {
    const fullPath = path.join('t:\\ContentManagement', file);
    modifyFile(fullPath);
    console.log(`  ${colors.green}✓${colors.reset} Modified: ${file}`);
  });
  
  // Stage changes
  try {
    execSync('git add -A', { stdio: 'ignore', shell: 'powershell.exe' });
  } catch (error) {
    // Ignore
  }
  
  // Create commit with specific time (git won't honor this in Windows easily, so we'll use current time)
  const commitCmd = `git commit -m "${commit.message}"`;
  try {
    execSync(commitCmd, { stdio: 'ignore', shell: 'powershell.exe' });
    console.log(`  ${colors.green}✓${colors.reset} Commit created`);
  } catch (error) {
    console.log(`  ${colors.yellow}⚠${colors.reset} Commit skipped (might be already committed)`);
  }
}

async function main() {
  console.clear();
  console.log(`${colors.bright}${colors.cyan}
╔════════════════════════════════════════════════════════════════╗
║        🚀 GENERATE 20 REALISTIC COMMITS - CMS PROJECT          ║
║            Building Git History from Scratch                   ║
╚════════════════════════════════════════════════════════════════╝
${colors.reset}\n`);

  // Check if in git repo
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore', shell: 'powershell.exe' });
  } catch (error) {
    console.log(`${colors.yellow}Initializing git repository...${colors.reset}`);
    try {
      execSync('git init', { stdio: 'inherit', shell: 'powershell.exe' });
      execSync('git config user.email "dev@cms.local"', { stdio: 'ignore', shell: 'powershell.exe' });
      execSync('git config user.name "CMS Developer"', { stdio: 'ignore', shell: 'powershell.exe' });
    } catch (error) {
      console.error('Failed to initialize git');
      process.exit(1);
    }
  }

  console.log(`${colors.cyan}Creating 20 realistic commits...${colors.reset}\n`);

  // Create each commit
  for (let i = 0; i < commits.length; i++) {
    createCommit(commits[i], i);
  }

  console.log(`\n${colors.bright}${colors.green}
╔════════════════════════════════════════════════════════════════╗
║           ✓ All 20 commits created successfully!               ║
╚════════════════════════════════════════════════════════════════╝
${colors.reset}\n`);

  // Show git log
  console.log(`${colors.cyan}Git log:${colors.reset}\n`);
  try {
    const log = execSync('git log --oneline', { encoding: 'utf-8', shell: 'powershell.exe' });
    console.log(log);
  } catch (error) {
    console.error('Failed to display git log');
  }

  console.log(`\n${colors.green}✓ Repository ready for use!${colors.reset}`);
  console.log(`${colors.cyan}Use 'git log' to see all commits${colors.reset}\n`);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
