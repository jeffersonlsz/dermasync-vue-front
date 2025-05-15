import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
/**
 * To configure server.allowedHosts, add the 'server' option
 * in the exported config object below.
 * Example:
 * server: {
 *   allowedHosts: ['yourdomain.com', 'localhost']
 * }
 */

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['e271-45-185-226-14.ngrok-free.app']
  }
})

