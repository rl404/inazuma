import { writable } from 'svelte/store';

export const NSFW = writable<boolean>(false);

const getNSFW = (): boolean => {
	let nsfw = true;
	if ('nsfw' in localStorage) {
		nsfw = localStorage.nsfw === 'true';
	}
	return nsfw;
};

export const setNSFW = (nsfw?: boolean) => {
	if (nsfw === undefined) {
		nsfw = getNSFW();
	}
	localStorage.nsfw = nsfw;
	NSFW.set(nsfw);
};

export const toggleNSFW = () => {
	const v = getNSFW();
	setNSFW(!v);
};

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
