export type Settings = {
	closeReportChatId: string;
	createReportChatId: string;
	settingsChatId: string;
};

let settings: Settings = {
	closeReportChatId: '',
	createReportChatId: '',
	settingsChatId: '',
};

export const getSettings = () => settings;
export const setSettings = (newSettings: Settings) => {
	settings = newSettings;
	return settings;
};
