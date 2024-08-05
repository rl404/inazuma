/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from '@sveltejs/kit';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { MonthNames } from './const';

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
	const group: any[] = [];
	for (let i = 0, j = 0; i < data.length; i++) {
		if (i >= n && i % n === 0) j++;
		group[j] = group[j] || [];
		group[j].push(data[i]);
	}
	return group;
};

export const toDate = (str: string | null): Date | null => {
	if (str === null) return null;
	if (isNaN(new Date(str).getTime())) return null;
	return new Date(str);
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

export const formatAuthor = (first: string, last: string): string => {
	return first === '' ? last : last === '' ? first : first + ' ' + last;
};

export const handleAPIResponse = async (resp: Response) => {
	if (!resp) throw error(500);
	const body = await resp.json();
	if (!resp.ok) throw error(resp.status, body.message || resp.statusText);
	return body;
};

export const formatMALDate = (year: number, month: number, day: number): string => {
	const d: string[] = [];
	if (year > 0) d.push(year.toString());
	if (month > 0) d.push(MonthNames[month - 1].slice(0, 3));
	if (day > 0) d.push(day.toString());
	return d.length > 0 ? d.join(' ') : '-';
};
