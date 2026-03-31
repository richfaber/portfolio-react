import path from 'path'

import react, { reactCompilerPreset } from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

import { visualizer } from 'rollup-plugin-visualizer'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      gif: { optimizationLevel: 3 },
      svg: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupIds: false,
              }
            }
          }
        ]
      },
      webp: { quality: 80 },
    }),
    visualizer({ open: false, filename: 'public/stats.html' })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules') || id.includes('src/vendor')) {
            if (['node_modules/react/', 'node_modules/react-dom/', 'node_modules/react-router-dom/', 'node_modules/react-router/'].some(pkg => id.includes(pkg))) return 'vendor'
            return 'plugin'
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.names?.[0]?.split('.').pop() ?? ''
          if (/css/.test(ext)) return 'css/[name]-[hash][extname]'
          if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) return 'image/[name]-[hash][extname]'
          if (/woff2?|ttf|eot/.test(ext)) return 'font/[name]-[hash][extname]'
          return '[name]-[hash][extname]'
        }
      }
    }
  },

  css: {
    preprocessorOptions: {
      
      scss: {
        silenceDeprecations: ['import'],

        additionalData: `
          @use "@/resource/style/define/variable" as *;
          @use "@/resource/style/define/mixin" as *;
          @use "@/resource/style/vendor/sassy-cubic-bezier" as *;
        `

      }

    }
  },

  server: {
    port: 5003,
    host: true,
    allowedHosts: ['5003.portfolio.codeserver.diffthink.kr']
  }
})
