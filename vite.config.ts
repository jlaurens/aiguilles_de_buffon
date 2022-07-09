import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path'

const STATIC_ROOT = '/buffon/'
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON=="true" ? './' : STATIC_ROOT,
  build: {
    outDir: 'dist',
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          // @import "./src/styles/_animations.scss";
          // @import "./src/styles/_variables.scss";
          // @import "./src/styles/_mixins.scss";
          // @import "./src/styles/_helpers.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
