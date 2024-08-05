import { writable } from 'svelte/store';

export const NSFW = writable<boolean>(false);

const getGrayscale = (): boolean => {
	let mode = true;
	if ('grayscale' in localStorage) {
		mode = localStorage.grayscale === 'true';
	}
	return mode;
};

export const setGrayscale = (mode?: boolean) => {
	if (mode === undefined) {
		mode = getGrayscale();
	}

	localStorage.grayscale = mode;
	if (mode) {
		document.documentElement.classList.add('grayscale');
	} else {
		document.documentElement.classList.remove('grayscale');
	}
};

export const toggleGrayscale = () => {
	setGrayscale(!getGrayscale());
};
