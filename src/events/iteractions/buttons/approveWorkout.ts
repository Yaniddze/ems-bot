import { ButtonInteraction } from 'discord.js';

import { getFromWaitingQueue, deleteFromWaitingQueue } from '../../../database';
import { removeFromAvailableRoles } from '../../../utils';

import { ButtonHandler } from './types';

export const approveWorkoutButton: ButtonHandler = {
	buttonId: 'принять выговор',
	handle: async (interaction: ButtonInteraction) => {
		const report = await getFromWaitingQueue(interaction.message.id);
		if (report === undefined) {
			await interaction.reply({
				content: 'На это сообщение не нужно больше отвечать',
				ephemeral: true,
			});
			return;
		}

		if (report.goodguy !== interaction.user.id) {
			await interaction.reply({
				content: 'Вы не можете рассматривать доказательства',
				ephemeral: true,
			});
			return;
		}

		const member = await interaction.guild.members.fetch(report.badguy);

		await deleteFromWaitingQueue(interaction.message.id);
		await removeFromAvailableRoles(member);

		if (interaction.channel.isThread()) {
			interaction.channel.send(`<@${report.goodguy}> приял доказатества и снял выговор`);
			interaction.channel.setArchived(true);
		}
	},
};
