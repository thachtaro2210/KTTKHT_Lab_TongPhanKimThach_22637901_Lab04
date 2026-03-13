# CMS Frontend (React + Vite)

## Setup

```bash
cd t:\ContentManagement\frontend
npm install
```

## Development

```bash
npm run dev
```

Frontend runs on http://localhost:3000 and proxies /api to backend (http://localhost:4000).

## Demo Credentials

- Email: `admin@example.com`
- Password: `password`

## Features

- **Dashboard**: View all published and draft posts
- **Editor**: Create, edit, publish posts (rich HTML)
- **Media Manager**: Upload and manage files
- **User Management** (admin only): Create, edit, delete users and assign roles
- **Auth**: Register, login, role-based access control (admin/editor)

## Build

```bash
npm run build
```

Output: `dist/`
