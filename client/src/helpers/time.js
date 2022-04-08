export const minutesAgo = (date, minutes) => {
	const minutesAgo = Date.now() - minutes;
	return date < minutesAgo;
};
