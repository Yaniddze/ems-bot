import { ButtonInteraction, MessageActionRow } from 'discord.js';

import { getFromWaitingQueue } from '../../../database';
import { getSettings } from '../../../store';

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

		await interaction.reply({
			content: `Используйте команду /отклонить-отработку в чате <#${
				getSettings().createReportChatId
			}> для отклонения отработки`,
		});
	},
};
