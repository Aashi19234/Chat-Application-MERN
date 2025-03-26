import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3001,
    proxy:{
      "/api":{
        target:"https://chat-application-mern-x2fc.onrender.com",
        changeOrigin:true,
      }
    }
  }
})
