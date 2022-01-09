import { Message } from 'discord.js';

import { getSettings } from '../../store';

import { removeFromAvailableRoles } from '../../utils';

import { NewMessageHandler } from './types';

export const CloseReportHandler: NewMessageHandler = {
	getChannel: () => getSettings().closeReportChatId,
	handle: async (message: Message) => {
		const users = message.mentions.users.map(x => x);
		if (users.length === 0) return;
		const metionedUser = users[0];
		const found = await message.guild.members.search({
			query: metionedUser.username,
		});

		const foundUser = found.get(metionedUser.id);

		await removeFromAvailableRoles(foundUser);
	},
};
