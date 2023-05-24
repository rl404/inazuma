/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				'2xs': ['0.5rem', { lineHeight: '0.75rem' }]
			},
			width: {
				xs: '20rem',
				sm: '24rem',
				md: '28rem',
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem'
			},
			textShadow: {
				sm: '-1px -1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color), 1px 1px 0 var(--tw-shadow-color)',
				DEFAULT:
					'-2px -2px 0 var(--tw-shadow-color), 2px -2px 0 var(--tw-shadow-color), -2px 2px 0 var(--tw-shadow-color), 2px 2px 0 var(--tw-shadow-color)',
				lg: '-4px -4px 0 var(--tw-shadow-color), 4px -4px 0 var(--tw-shadow-color), -4px 4px 0 var(--tw-shadow-color), 4px 4px 0 var(--tw-shadow-color)'
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value
					})
				},
				{ values: theme('textShadow') }
			);
		})
	]
};
