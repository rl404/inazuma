// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			margin: {
				15: '3.75rem'
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
			fontFamily: {
				manga: 'WildWords'
			},
			aspectRatio: {
				portrait: '7/10'
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
