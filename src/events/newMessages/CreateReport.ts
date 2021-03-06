import { Message } from 'discord.js';

import { getSettings } from '../../store';
import { removeFromAvailableRoles } from '../../utils';

import { NewMessageHandler } from './types';

export const CreateReportHandler: NewMessageHandler = {
	getChannel: () => getSettings().createReportChatId,
	handle: async (message: Message) => {
		const embed = message.embeds.find(x => x.title === 'Поступил новый выговор!');

		if (embed === undefined) return;

		const roleName = embed.fields.find(x => x.name === 'Выданный выговор').value.match(/([А-я]+ \d\/\d)/)[0];

		const guild = message.guild;

		const roleToSet = guild.roles.cache.find(x => x.name === roleName);

		const metionedUser = message.mentions.users.map(x => x)[0];
		const found = await guild.members.search({
			query: metionedUser.username,
		});

		const foundUser = found.get(metionedUser.id);

		await removeFromAvailableRoles(foundUser);
		await foundUser.roles.add(roleToSet);

		const thread = await message.startThread({
			name: 'Почему Вадим плох',
		});

		await thread.send('Вадим хуй');
	},
};
