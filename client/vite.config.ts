import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

const backend_url = 'http://localhost:5000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
      proxy: {
          '/refund': {
              target: backend_url,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/refund/, '/refund')
          },
      }
  },
})
