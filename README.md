# LaunchGremlin Website

A production-ready React application for LaunchGremlin, built with Vite and Tailwind CSS v4.

## Features
- **Dynamic Background**: Interactive particle system.
- **Scroll Tracking**: Progress bar and section highlighting.
- **Modern Animations**: Smooth entry animations and hover effects.
- **Glassmorphism**: Premium aesthetic with blur and borders.
- **Responsive**: Fully responsive grid and layouts.

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Development

The code is organized as follow:
- `src/App.jsx`: Main application component and layout.
- `src/index.css`: Tailwind v4 configuration and global styles/animations.
- `src/main.jsx`: Application entry point.
- `legacy_and_assets/`: Original prototype assets and icons.

## Backend lead generation

This project now includes a backend API for lead submission, safe request handling, and delivery to email or webhook destinations.

1. Copy `.env.example` to `.env`.
2. Update SMTP settings or set `WEBHOOK_URL`.
3. Optionally set `LEAD_LOG_PATH` to persist lead metadata for auditing.
4. Start the backend server in development:
   ```bash
   npm run server
   ```
5. Run the frontend in development:
   ```bash
   npm run dev
   ```
6. To run both together in development:
   ```bash
   npm run dev:full
   ```

For production deployments:
- Run `npm run build` to build the frontend.
- Run `npm start` to launch the backend and serve the production build from `dist`.
- Make sure `NODE_ENV=production` and configure a valid `SMTP_*` provider or `WEBHOOK_URL`.

The backend includes static asset serving in production, API rate limiting, security headers, and request validation.

The frontend proxies `/api/lead` to the backend during development.

## Production deployment

For a production deployment, use a host that can run both the Vite build and the Node backend (or deploy the backend and static assets separately).

NOTE: GitHub Pages deployment has been removed in favor of Render as the production host.

Recommended checklist:
- Set `NODE_ENV=production`
- Configure SMTP or a webhook destination
- Optionally configure Supabase for persistent lead storage
- Set a strong `ADMIN_TOKEN` for lead review access
- Run `npm run build` and start the server with `npm start`

### Docker
```bash
docker build -t launchgremlin-website .
docker run -p 4000:4000 --env-file .env launchgremlin-website
```

### CI
This repository includes a GitHub Actions workflow in [.github/workflows/ci.yml](.github/workflows/ci.yml) that runs tests and the production build on pushes and pull requests.
