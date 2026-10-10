# QASIM Platform

QASIM Platform is a modern full-stack development platform starter built for product teams, internal tools, and scalable web applications. It includes a React frontend, an Express backend, PostgreSQL integration, Docker support, and a clean monorepo layout.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- Containerization: Docker + Docker Compose
- Package management: npm workspaces

## Project Structure

```text
QASIM-Platform/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── server.js
│   │   ├── .env.example
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       ├── index.html
│       ├── vite.config.js
│       ├── .env.example
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml
├── .gitignore
├── package.json
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development environment

```bash
npm run dev
```

This starts:
- Frontend at http://localhost:3000
- Backend API at http://localhost:5000

### 3. Build for production

```bash
npm run build
```

### 4. Run backend in production mode

```bash
npm start
```

## Environment Setup

Copy the example environment files:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

## Docker Setup

```bash
docker compose up --build
```

## Default API Routes

- GET /api -> platform info
- GET /api/health -> health status

## Notes

This repository is intentionally structured as a starter platform so you can extend it with authentication, RBAC, dashboards, APIs, and admin modules.

## License

MIT
