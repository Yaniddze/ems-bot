const timeAndDateFormatter = new Intl.DateTimeFormat('ru', {
	hour: 'numeric',
	minute: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: 'Europe/Moscow',
});

export const formatDate = (date: Date) => {
	return timeAndDateFormatter.format(date);
};
