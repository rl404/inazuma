import type { AxiosError } from 'axios';
import axios from 'axios';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const formatMALDate = (year: number, month: number, day: number): string => {
	let d: string[] = [];
	if (year > 0) d.push(year.toString());
	if (month > 0) d.push(monthNames[month - 1].slice(0, 3));
	if (day > 0) d.push(day.toString());
	return d.length > 0 ? d.join(' ') : '-';
};

export const getAxiosError = (error: Error | AxiosError): string => {
	if (
		!axios.isAxiosError(error) ||
		!error.response ||
		!error.response.data ||
		!error.response.data.message
	) {
		return error.message;
	}
	return error.response.data.message;
};

export const groupArr = (data: any[], n: number): any[] => {
	var group: any[] = [];
	for (var i = 0, j = 0; i < data.length; i++) {
		if (i >= n && i % n === 0) j++;
		group[j] = group[j] || [];
		group[j].push(data[i]);
	}
	return group;
};

export const clickAway = (el: any): any => {
	const handleClick = (e: MouseEvent) => {
		if (el && !el.contains(e.target) && !e.defaultPrevented) {
			el.dispatchEvent(new CustomEvent('clickAway', el));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const toDate = (str: string | null): Date | null => {
	if (str === null) return null;
	if (isNaN(new Date(str).getTime())) return null;
	return new Date(str);
};

export const formatAuthor = (first: string, last: string): string => {
	return first === '' ? last : last === '' ? first : first + ' ' + last;
};
