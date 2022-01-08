import { Client, Message } from 'discord.js';

import { getSettings, setSettings } from '../../store';
import { normalizeSettings } from '../../utils';
import { UpdateMessageHandler } from './types';

export const CreateReportHandler: UpdateMessageHandler = {
	getChannel: () => getSettings().settingsChatId,
	handle: async (client: Client, oldMessage: Message, newMessage: Message) => {
		const newSettings = normalizeSettings(newMessage);
		try {
			const newParsedSettings = JSON.parse(newSettings);
			setSettings({ ...getSettings(), ...newParsedSettings });
		} catch {}
	},
};
