import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

process.env.BROWSER = "chrome"

export default defineConfig({
  
  plugins: [react(), viteStaticCopy({
    targets: [{
        src: './config',
        dest: './'
      }]
    })],
    build: {
      chunkSizeWarningLimit: 2000
    },
    server: {
      open: true,
      host: true
    },
    base: '/krajske-budovy/' /* Po předání aplikace přenastavit na './' */
})
