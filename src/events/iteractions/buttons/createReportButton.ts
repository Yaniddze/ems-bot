import { ButtonInteraction, Client } from 'discord.js';
import { getSettings } from '../../../store';
import { removeFromAvailableRoles, addDaysToDate, normalizeRole } from '../../../utils';

import { addReport } from '../../../database';

import { ButtonHandler } from './types';

export const createReportButton: ButtonHandler = {
	getChannelId: () => getSettings().createReportChatId,
	handle: async (client: Client, interaction: ButtonInteraction) => {
		const embed = interaction.message.embeds[0];

		if (embed === undefined) return;

		const roleId = normalizeRole(embed.fields.find(x => x.name === 'Выданный выговор').value);

		const guild = interaction.guild;

		const badGuyValue = embed.fields.find(x => x.name === 'Нарушитель').value;
		const metionedUser = badGuyValue.slice(2, badGuyValue.length - 1);

		const foundUser = await guild.members.fetch(metionedUser);

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
	},
};
