import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    
    server: {
      host: true,
      port: 5173,
      open: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Connection': 'keep-alive'
          }
        }
      },
      hmr: {
        host: 'localhost',
        protocol: 'ws'
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
            if (id.includes('node_modules')) {
              return 'vendor';
            }
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
    
    // --- SEÇÃO CORRIGIDA ---
    // A injeção global de `additionalData` foi removida para evitar erros de compilação.
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    
    logLevel: 'error',
    
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  };
});