# Caffeine Tracker

A full-stack app for tracking daily caffeine intake. Visualizes consumption on a 14-day grid, color-coded by amount.

**Backend**: FastAPI + SQLAlchemy (async) + SQLite
**Frontend**: React + TypeScript + Vite + Tailwind CSS + React Query

## Prerequisites

- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [Node.js](https://nodejs.org/) (v18+)

## Setup

### Backend

```bash
cd backend

# Install dependencies
uv sync

# Create .env file
cp .env.example .env  # or create manually:
# DATABASE_URL=sqlite+aiosqlite:///./caffeine.db
# CORS_ORIGINS=http://localhost:5173

# Run database migrations
uv run alembic upgrade head

# Start the server
uv run uvicorn app.main:app --reload
```

The API runs at **http://localhost:8000**. Interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs).

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # or create manually:
# VITE_API_BASE_URL=http://localhost:8000

# Start dev server
npm run dev
```

The app runs at **http://localhost:5173**.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/intake/` | Log a caffeine intake (datetime + amount in mg) |
| `GET` | `/api/v1/intake/` | List intakes (optional `start_date` / `end_date` query params, defaults to last 14 days) |

## Project Structure

```
backend/
├── app/
│   ├── api/v1/endpoints/   # Route handlers
│   ├── core/               # Config, database setup
│   ├── models/             # SQLAlchemy models
│   ├── repositories/       # Data access layer
│   ├── schemas/            # Pydantic request/response schemas
│   └── services/           # Business logic
├── alembic/                # Database migrations
└── pyproject.toml

frontend/
├── src/
│   ├── components/         # React components (grid, modal)
│   ├── hooks/              # React Query hooks
│   ├── services/           # API client
│   └── types/              # TypeScript types
├── package.json
└── vite.config.ts
```
