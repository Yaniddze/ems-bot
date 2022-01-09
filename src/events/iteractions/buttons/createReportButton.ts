import { ButtonInteraction, Client } from 'discord.js';
import { getSettings } from '../../../store';
import { removeFromAvailableRoles } from '../../../utils';

import { ButtonHandler } from './types';

export const createReportButton: ButtonHandler = {
	getChannelId: () => getSettings().createReportChatId,
	handle: async (client: Client, interaction: ButtonInteraction) => {
		const embed = interaction.message.embeds[0];

		if (embed === undefined) return;

		const roleName = embed.fields.find(x => x.name === 'Выданный выговор').value.match(/([А-я]+ \d\/\d)/)[0];

		const guild = interaction.guild;

		const badGuyValue = embed.fields.find(x => x.name === 'Нарушитель').value;
		const metionedUser = badGuyValue.slice(2, badGuyValue.length - 1);

		const allRoles = await interaction.guild.roles.fetch();
		const foundUser = await guild.members.fetch(metionedUser);

		await removeFromAvailableRoles(foundUser);
		await foundUser.roles.add(allRoles.find(x => x.name === roleName));

		await interaction.channel.send({
			embeds: [embed],
		});
	},
};
