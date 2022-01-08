import { Client } from 'discord.js';
import { setSettings } from './store';
import { normalizeSettings } from './utils';

const availableSettingsChannelNames = ['настройки', 'настройки ems-bot', 'настройки emsbot', 'emsbot settings'];

export const initSettings = async (client: Client) => {
	const guilds = await client.guilds.fetch(process.env.GUILD_ID);
	const channels = await guilds.channels.fetch();
	const settingsChannel = channels.find(x => availableSettingsChannelNames.includes(x.name.toLocaleLowerCase()));

	if (settingsChannel === undefined) throw Error('Settings channel not found');

	if (!settingsChannel.isText()) throw Error('Settings is not text channel');

	const messages = await settingsChannel.messages.fetch();

	const messageWithSettings = messages.find(x => x.content.startsWith('```json') && x.content.endsWith('```'));

	if (messageWithSettings === undefined) throw Error('There is no message with settings');

	const normalizedSettings = normalizeSettings(messageWithSettings);
	const settings = JSON.parse(normalizedSettings);

	setSettings({ ...settings, settingsChatId: settingsChannel.id });
};
