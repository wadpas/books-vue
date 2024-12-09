import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import VueRouter from "unplugin-vue-router/vite"
import autoprefixer from "autoprefixer"
import tailwind from "tailwindcss"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    VueRouter({}),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("iconify-icon"),
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
