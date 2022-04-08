import { CATEGORIES } from '../constants/constants';

export const updateDocTitle = (title, path) => {
	const newPath = path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);

	return `${newPath} - ${title}`;
};

export const updatePath = (path, history) => {
	if (CATEGORIES.includes(path.replace('/', ''))) return path;

	history.push(`${CATEGORIES[0]}`);
};

export const firstLetter = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase();
};
