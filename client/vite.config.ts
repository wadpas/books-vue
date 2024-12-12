import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
	plugins: [
		VueRouter({}),
		Components({
			/* options */
		}),
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/, // .md
			],
			imports: [
				// presets
				'vue',
				VueRouterAutoImports,
				{ pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] },
			],
			dts: './auto-imports.d.ts',
			viteOptimizeDeps: true,
			dirs: ['./src/composables/**', './src/stores/**'],
		}),
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('iconify-icon'),
				},
			},
		}),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
