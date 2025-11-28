import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  // carrega .env, .env.[mode] etc
  const env = loadEnv(mode, process.cwd(), '')

  // Variáveis importantes:
  // - VITE_API_BASE: URL base para a API (ex: http://localhost:5000). Usado pelo proxy em dev.
  // - VITE_HMR_HOST: host para HMR (útil se você testar em VM/WSL/ngrok)
  const API_BASE = env.VITE_API_BASE || 'http://localhost:5000'
  const HMR_HOST = env.VITE_HMR_HOST || 'localhost'

  return {
    plugins: [vue()],

    server: {
      host: true,
      port: 5173,
      open: true,
      strictPort: true,

      // Proxy para evitar CORS durante o desenvolvimento.
      // Use import.meta.env.VITE_API_BASE para apontar o backend sem tocar no código.
      proxy: {
        '/api': {
          target: API_BASE,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (p) => p.replace(/^\/api/, ''),

          // Mantemos keep-alive e cabeçalhos extras caso o backend precise.
          headers: {
            Connection: 'keep-alive'
          }
        }
      },

      // HMR mais explícito (útil para WSL/VM/ngrok). Pode ser sobrescrito por VITE_HMR_HOST.
      hmr: {
        host: HMR_HOST,
        protocol: 'ws'
      },

      // Melhor sensibilidade a mudanças em ambientes Windows/WSL
      watch: {
        usePolling: false
      }
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1600,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) return 'vendor'
          },
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },

    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') }
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json']
    },

    // CSS modules e configuração mínima para evitar erros de compilação
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import', 'legacy-js-api', 'function-units'],
          quietDeps: true,
        }
      }
    },

    // injetamos variável de ambiente pequena para uso js runtime se precisar
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode)
    },

    logLevel: 'error',

    optimizeDeps: {
      include: ['vue', 'vue-router', 'axios']
    }
  }
})
