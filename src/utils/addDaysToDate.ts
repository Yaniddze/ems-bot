export const addDaysToDate = (date: Date, days: number) => {
	date.setDate(date.getDate() + days);
	return date;
};
