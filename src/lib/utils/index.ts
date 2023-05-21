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
