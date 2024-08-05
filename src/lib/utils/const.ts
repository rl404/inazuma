export const MonthNames = [
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

export const mangaTypes = (type: string): string => {
	switch (type) {
		case 'MANGA':
			return 'Manga';
		case 'NOVEL':
			return 'Novel';
		case 'ONE_SHOT':
			return 'One Shot';
		case 'DOUJINSHI':
			return 'Doujinshi';
		case 'MANHWA':
			return 'Manhwa';
		case 'MANHUA':
			return 'Manhua';
		case 'OEL':
			return 'OEL';
		case 'LIGHT_NOVEL':
			return 'Light Novel';
		default:
			return '-';
	}
};

export const mangaStatuses = (status: string): string => {
	switch (status) {
		case 'FINISHED':
			return 'Finished';
		case 'RELEASING':
			return 'Releasing';
		case 'NOT_YET':
			return 'Not yet released';
		case 'HIATUS':
			return 'Hiatus';
		case 'DISCONTINUED':
			return 'Discontinued';
		default:
			return '-';
	}
};

export const mangaRelations = (relation: string): string => {
	switch (relation) {
		case 'SEQUEL':
			return 'Sequel';
		case 'PREQUEL':
			return 'Prequel';
		case 'ALTERNATIVE_SETTING':
			return 'Alternative Setting';
		case 'ALTERNATIVE_VERSION':
			return 'Alternative Version';
		case 'SIDE_STORY':
			return 'Side Story';
		case 'PARENT_STORY':
			return 'Parent Story';
		case 'SUMMARY':
			return 'Summary';
		case 'FULL_STORY':
			return 'Full Story';
		case 'SPIN_OFF':
			return 'Spin Off';
		case 'ADAPTATION':
			return 'Adaptation';
		case 'CHARACTER':
			return 'Character';
		case 'OTHER':
			return 'Other';
		default:
			return '-';
	}
};
