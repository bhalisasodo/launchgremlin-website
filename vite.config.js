import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
const basePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
    base: basePath,
    plugins: [
        react(),
        tailwindcss(),
    ],
})
