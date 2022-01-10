import { SlashCommandBuilder } from '@discordjs/builders';

import { getReportByMessage, deleteFromWaitingQueue } from '../../../../database';
import { removeFromAvailableRoles } from '../../../../utils';

import { Command } from '../types';

export const approveWorkout: Command = {
	name: 'принять-отработку',
	data: new SlashCommandBuilder()
		.setName('принять-отработку')
		.setDescription('Принять отработку')
		.addStringOption(option =>
			option
				.setName('комментарий')
				.setDescription('Комментарий')
				.setRequired(false),
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

		if (report.goodguy !== interaction.user.id) {
			await interaction.reply({
				content: 'Вы не можете рассматривать доказательства',
				ephemeral: true,
			});
			return;
		}

		const comment = interaction.options.get('комментарий').value;

		const member = await interaction.guild.members.fetch(report.badguy);

		await deleteFromWaitingQueue(report.waitmessage);
		await removeFromAvailableRoles(member);

		await interaction.channel.send(
			`<@${report.badguy}>\n<@${report.goodguy}> принял вашу отработку:\n${comment || ''}`,
		);

		await interaction.channel.setArchived(true);
	},
};
