import { defineConfig } from 'vite'
import path from 'path'

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
          { name: 'removeViewBox', active: false },
          { name: 'cleanupIDs', active: false },
        ]
      },
      webp: { quality: 80 },
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  css: {
    preprocessorOptions: {
      
      scss: {
        silenceDeprecations: ['import'],

        additionalData: `
          @use "@/resource/styles/define/variable" as *;
          @use "@/resource/styles/define/mixin" as *;
          @use "@/resource/styles/vendor/sassy-cubic-bezier" as *;
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
