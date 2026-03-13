# CMS - Content Management System

A full-stack CMS built with Node.js + React featuring user authentication, content management, media uploads, and role-based access control.

## Architecture

- **Backend**: Express + TypeScript + MongoDB
- **Frontend**: React + Vite + TypeScript
- **Database**: MongoDB (local)

## Three Core Features

1. **Content Management** - Create, edit, publish, and version articles/pages
2. **Media Management** - Upload and organize media files
3. **User & Auth** - Register, login, role-based access (admin/editor)

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (mongodb://localhost:27017)

### Backend Setup

```powershell
cd t:\ContentManagement\backend
npm install
npm install -D @types/node
Copy-Item .env.example .env
# Edit .env and set MONGO_URI, JWT_SECRET
npm run seed      # Create admin user + sample data
npm run dev       # Start server on http://localhost:4000
```

### Frontend Setup

```powershell
cd t:\ContentManagement\frontend
npm install
npm run dev       # Start on http://localhost:3000
```

### Login

- Email: `admin@example.com`
- Password: `password`

## Project Structure

```
backend/
  src/
    controllers/     - Business logic (auth, content, media, users)
    models/          - MongoDB schemas
    routes/          - API endpoints
    middlewares/     - Auth middleware
    server.ts        - Express app

frontend/
  src/
    pages/           - React pages (Dashboard, Editor, Media, Users)
    main.tsx         - Router and app layout
    styles.css       - Global styles
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user info (Bearer required)

### Content
- `GET /api/contents` - List all (public)
- `POST /api/contents` - Create (auth required)
- `PUT /api/contents/:id` - Update (auth required)
- `DELETE /api/contents/:id` - Delete (auth required)
- `POST /api/contents/:id/publish` - Publish (auth required)

### Media
- `GET /api/media` - List (public)
- `POST /api/media` - Upload (multipart, auth required)
- `DELETE /api/media/:id` - Delete (auth required)

### Users (Admin Only)
- `GET /api/users` - List users
- `PUT /api/users/:id` - Update role
- `DELETE /api/users/:id` - Delete user

## Roles

- **Admin**: Full access to all features, user management
- **Editor**: Create/edit/publish content, manage own media

## Demo Credentials

```
Email: admin@example.com
Password: password
```

## Development

Both servers support hot-reload:
- Backend: `npm run dev` (ts-node-dev)
- Frontend: `npm run dev` (Vite)

## Build

```powershell
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
# Output: dist/
```

## Notes

- MongoDB connection: `mongodb://localhost:27017/cms_db` (configurable in `.env`)
- JWT expiration: 7 days
- Upload directory: `backend/uploads/`
- Frontend proxy: `/api` → `http://localhost:4000`
