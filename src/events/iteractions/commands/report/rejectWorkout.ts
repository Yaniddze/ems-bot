import { SlashCommandBuilder } from '@discordjs/builders';

import { getReportByMessage, deleteFromWaitingQueue } from '../../../../database';

import { Command } from '../types';

export const rejectWorkout: Command = {
	name: 'отклонить-отработку',
	data: new SlashCommandBuilder()
		.setName('отклонить-отработку')
		.setDescription('Отклонить отработку')
		.addStringOption(option =>
			option
				.setName('причина')
				.setDescription('Причина отклонения доказательств отработки')
				.setRequired(true),
		),
	async execute(interaction) {
		if (!interaction.channel.isThread()) {
			await interaction.reply({
				content: 'Эту команду можно выполнять только в треде',
				ephemeral: true,
			});
			return;
		}

		const starterMessage = await interaction.channel.fetchStarterMessage();

		const report = await getReportByMessage(starterMessage.id);

		if (report === undefined) {
			await interaction.reply({
				content: 'В треде нет сообщений на проверку',
				ephemeral: true,
			});
			return;
		}

		const reason = interaction.options.get('причина').value;

		await deleteFromWaitingQueue(report.waitmessage);

		await interaction.channel.send(`<@${report.badguy}>\n<@${report.goodguy}> отклонил вашу отработку:\n${reason}`);
	},
};
