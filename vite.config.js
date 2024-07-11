import path from 'path';
import { defineConfig } from 'vite';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';
import { eleventyPlugin } from './plugins/vite-plugin-eleventy';
import eslint from 'vite-plugin-eslint';
import checkerPlugin from 'vite-plugin-checker';

/**
 * 各ファイル(JSとSCSS)情報の配列をまとめて、Objectにする設定
 */

const inputJsArray = globSync('src/assets/scripts/**/*.js', { ignore: ['node_modules/**', '**/modules/**', '**/html/**'] }).map((file) => {
	return [path.relative('src', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});

const inputScssArray = globSync('src/assets/styles/**/*.scss', { ignore: ['src/assets/styles/**/_*.scss'] }).map((file) => {
	return [path.relative('src', file.slice(0, file.length - path.extname(file).length)), fileURLToPath(new URL(file, import.meta.url))];
});

const inputObj = Object.fromEntries(inputJsArray.concat(inputScssArray));

export default defineConfig({
	root: 'src',
	base: '/',
	publicDir: '../public',
	plugins: [
		checkerPlugin({
			stylelint: {
				lintCommand: 'stylelint **/*.{css,scss,sass,less,styl,vue,svelte}',
			},
		}),
		eslint(),
		eleventyPlugin({
			baseDir: '/',
		}),
	],

	appType: 'mpa',

	server: {
		port: '3000',
	},

	build: {
		assetsInlineLimit: 0,
		outDir: '../dist/',
		rollupOptions: {
			input: inputObj,
			output: {
				assetFileNames: (assetInfo) => {
					let extType = path.extname(assetInfo.name);

					if (/css$/.test(assetInfo.name)) {
						return '[name].[ext]';
					}

					if (/jpg|jpeg|png|webp|svg|gif|avif/.test(extType)) {
						return 'assets/images/[name].[ext]';
					}

					return 'assets/[name].[ext]';
				},
				chunkFileNames: 'assets/scripts/[name].js',
				entryFileNames: '[name].js',
				manualChunks(id) {
					if (id.includes("node_modules") || (id.includes('modules/index') && !id.includes("node_modules"))) {
						return "vendor";
					}
				},
			},
		},
		emptyOutDir: false,
		modulePreload: {
			polyfill: false,
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_debugger: true,
			},
		},
	},
});
