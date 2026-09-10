#!/usr/bin/env bash
set -e

echo "==> 1. Installing root dependencies..."
npm install

echo "==> 2. Compiling Vite frontend and generating static routes..."
npm run build

echo "==> 3. Installing backend dependencies..."
npm --prefix backend install

echo "==> Render build complete!"
