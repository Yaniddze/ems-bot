import { ButtonInteraction } from 'discord.js';

import { getFromWaitingQueue } from '../../../database';

import { ButtonHandler } from './types';

export const rejectWorkoutButton: ButtonHandler = {
	buttonId: 'отклонить выговор',
	handle: async (interaction: ButtonInteraction) => {
		const report = await getFromWaitingQueue(interaction.message.id);
		if (report === undefined) {
			await interaction.reply({
				content: 'На это сообщение не нужно больше отвечать',
				ephemeral: true,
			});
			return;
		}
	},
};
