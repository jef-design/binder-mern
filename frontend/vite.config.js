import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/binder': {
        target: 'https://binder-api.onrender.com', // Replace with the URL of your backend server
        changeOrigin: true,
      },
    },
  },
})
