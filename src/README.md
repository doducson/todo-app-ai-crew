# AI Generated Project

A simple todo list application demonstrating a React frontend and Express backend with PostgreSQL persistence. Includes user authentication and CRUD operations for tasks.

## Structure
- `/backend` – Express.js API with authentication and task management.
- `/frontend` – React SPA (Create React App) consuming the API.

## Development
1. Install root dependencies (concurrently, eslint, etc.):
   ```bash
   npm install
   ```
2. Install workspace dependencies:
   ```bash
   npm install --workspace backend
   npm install --workspace frontend
   ```
3. Start both servers concurrently:
   ```bash
   npm run dev
   ```

## Environment
- Copy `/backend/.env.example` to `/backend/.env` and fill in PostgreSQL connection and JWT secret.

## Testing
- Backend: `npm run test` (placeholder for future enhancement)
- Frontend: `npm run test --workspace frontend`
