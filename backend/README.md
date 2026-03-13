CMS Backend (Express + TypeScript + File-Based JSON DB)

Architecture: Layered + Microkernel (see ../ARCHITECTURE.md for details)

Setup (Windows PowerShell):

1. Install dependencies
   cd t:\ContentManagement\backend
   npm install
   npm install -D @types/node

2. Create .env from .env.example
   Copy-Item .env.example .env
   # Edit .env: change JWT_SECRET to something strong

3. Seed database (create admin user + sample data)
   npm run seed

4. Run dev server (hot reload via ts-node-dev)
   npm run dev
   # Expected: "🚀 CMS Server running on http://localhost:4000"

Database:
  - File-based: backend/data/{users,contents,media}.json
  - No external database needed
  - Auto-loads on startup
  - Auto-saves after each write

API Endpoints:
  POST /api/auth/register        - Register new user
  POST /api/auth/login           - Login, returns JWT
  GET /api/auth/me               - Current user (Bearer required)
  
  GET /api/contents              - List all posts
  POST /api/contents             - Create post (Bearer required)
  GET /api/contents/:id          - Get single post
  PUT /api/contents/:id          - Update post (Bearer required)
  DELETE /api/contents/:id       - Delete post (Bearer required)
  POST /api/contents/:id/publish - Publish draft (Bearer required)
  
  GET /api/media                 - List media
  POST /api/media                - Upload file (multipart, Bearer required)
  DELETE /api/media/:id          - Delete file (Bearer required)
  
  GET /api/users                 - List users (admin only)
  PUT /api/users/:id             - Update role (admin only)
  DELETE /api/users/:id          - Delete user (admin only)

Demo Credentials:
  Email: admin@example.com
  Password: password

Plugins Loaded:
  • AuthPlugin    - Authentication & user registration
  • ContentPlugin - Post CRUD & versioning
  • MediaPlugin   - File management
  • UserPlugin    - User management & roles
