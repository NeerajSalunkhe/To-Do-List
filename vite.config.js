import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '3227-2409-40c2-5016-b550-3136-c2ef-c4f7-1623.ngrok-free.app',
    ],
    host: true, // this allows access from external networks like ngrok
  },
})
