import { ButtonInteraction, Client } from 'discord.js';
import { getSettings } from '../../../store';
import { removeFromAvailableRoles, addDaysToDate, normalizeRole } from '../../../utils';

import { addReport, getUnresolvedMessage } from '../../../database';

import { ButtonHandler } from './types';

export const createReportButton: ButtonHandler = {
	getChannelId: () => getSettings().createReportChatId,
	buttonId: 'создать',
	handle: async (interaction: ButtonInteraction) => {
		const embed = interaction.message.embeds[0];

		if (embed === undefined) return;

		const roleId = normalizeRole(embed.fields.find(x => x.name === 'Выданный выговор').value);

		const guild = interaction.guild;

		const badGuyValue = embed.fields.find(x => x.name === 'Нарушитель').value;
		const metionedUser = badGuyValue.slice(2, badGuyValue.length - 1);

		const foundUser = await guild.members.fetch(metionedUser);
		const lastMessage = await getUnresolvedMessage(foundUser.id);

		await removeFromAvailableRoles(foundUser);
		await foundUser.roles.add(roleId);

		const message = await interaction.channel.send({
			embeds: [embed],
		});

		await addReport({
			datecreate: new Date().toISOString(),
			dateexpire: addDaysToDate(new Date(), 3).toISOString(),
			badguy: metionedUser,
			goodguy: interaction.user.id,
			messageid: message.id,
		});

		if (lastMessage === '') return;

		const foundMessage = await interaction.channel.messages.fetch(lastMessage);
		const thread = await foundMessage.startThread({
			name: 'Поступил новый выговор',
		});

		await thread.send({
			content: `Был выдан новый выговор https://discord.com/channels/${process.env.GUILD_ID}/${
				getSettings().createReportChatId
			}/${message.id}`,
		});

		await thread.setArchived(true);
	},
};
