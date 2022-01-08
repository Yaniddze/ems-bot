export type Settings = {
	xyu: number;
};

let settings: Settings = {
	xyu: 1,
};

export const getSettings = () => settings;
export const setSettings = (newSettings: Settings) => {
	settings = newSettings;
	return settings;
};
