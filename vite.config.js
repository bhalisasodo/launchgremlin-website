import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/launchgremlin-website/',
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                changeOrigin: true,
            },
        },
    },
})
