export type Settings = {
	closeReportChatId: string;
	createReportChatId: string;
};

let settings: Settings = {
	closeReportChatId: '',
	createReportChatId: '',
};

export const getSettings = () => settings;
export const setSettings = (newSettings: Settings) => {
	settings = newSettings;
	return settings;
};
