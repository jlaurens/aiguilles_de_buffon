import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import path from "path-browserify"

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON=="true" ? './' : "",
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

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       path: "path-browserify",
//     },
//   },
// })
