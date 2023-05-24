export enum ThemeMode {
	Light = 'light',
	Dark = 'dark'
}

export const setTheme = (mode?: ThemeMode) => {
	if (!mode) {
		mode = getTheme();
	}

	localStorage.theme = mode;
	if (mode === ThemeMode.Dark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

const getTheme = (): ThemeMode => {
	let mode = ThemeMode.Light;
	if ('theme' in localStorage) {
		mode = localStorage.theme;
	}
	return mode;
};

export const toggleGrayscale = () => {
	let mode = getGrayscale();

	mode = !mode;

	localStorage.grayscale = mode;
	if (mode) {
		document.documentElement.classList.add('grayscale');
	} else {
		document.documentElement.classList.remove('grayscale');
	}
};

export const setGrayscale = (mode?: boolean) => {
	if (!mode) {
		mode = getGrayscale();
	}

	localStorage.grayscale = mode;
	if (mode) {
		document.documentElement.classList.add('grayscale');
	} else {
		document.documentElement.classList.remove('grayscale');
	}
};

const getGrayscale = (): boolean => {
	let mode = true;
	if ('grayscale' in localStorage) {
		mode = localStorage.grayscale === 'true';
	}
	return mode;
};
