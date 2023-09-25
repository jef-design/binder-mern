import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
  server: {
    proxy: {
      '/api/binder': {
        target: 'http://localhost:5000', // Replace with the URL of your backend server
        changeOrigin: true,
      },
      
    },
  },
=======
 plugins: [react()],
>>>>>>> 48cf4afe657d84e6207d8a49344ae202613d3ddf
})
