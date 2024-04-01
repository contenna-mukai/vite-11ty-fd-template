/**
 * @type { import('eslint').Linter.Config }
 */
module.exports = {
	root: true,
	extends: ['airbnb-base', 'plugin:eslint-comments/recommended', 'plugin:regexp/recommended', "prettier"],
	env: {
		browser: true,
		es2022: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	reportUnusedDisableDirectives: true,
	rules: {
		'eslint-comments/disable-enable-pair': [
			'error',
			{
				allowWholeFile: true,
			},
		],
		'import/no-anonymous-default-export': 'error',
		'import/prefer-default-export': 'off',
		'no-continue': 'off',
		'no-restricted-syntax': 'off',
		'no-tabs': 0,
		indent: [2, 'tab'],
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
