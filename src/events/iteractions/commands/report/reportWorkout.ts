import { SlashCommandBuilder } from '@discordjs/builders';

import { getSettings } from '../../../../store';
import { getReportByBadGuy, addInWaitingQueue, checkAnyWaiting } from '../../../../database';

import { Command } from '../types';

export const reportWorkout: Command = {
	channelId: () => getSettings().createReportChatId,
	name: 'отработал-выговор',
	data: new SlashCommandBuilder()
		.setName('отработал-выговор')
		.setDescription('Оставить заявку на проверку отработанного выговора')
		.addStringOption(option =>
			option
				.setName('доказательства')
				.setDescription('Доказательства о отработанном выговоре')
				.setRequired(true),
		),
	async execute(interaction) {
		const report = await getReportByBadGuy(interaction.user.id);

		if (report === undefined) {
			await interaction.reply({
				content: 'У вас нет выговоров для отработки',
				ephemeral: true,
			});
			return;
		}

		const anyWaiting = await checkAnyWaiting(report.id);

		if (anyWaiting) {
			await interaction.reply({
				content: 'Ваши доказательства уже ожидают проверки. Пожалуйста, дождитесь окончания этой проверки.',
				ephemeral: true,
			});
			return;
		}

		const proofs = interaction.options.get('доказательства').value;

		const message = await interaction.channel.messages.fetch(report.messageid);
		const user = await interaction.guild.members.fetch(report.badguy);

		const thread = message.hasThread
			? await message.thread.fetch()
			: await message.startThread({
					name: user.nickname || user.user.username,
			  });

		const approveMessage = await thread.send({
			content: `<@${report.goodguy}>\n<@${report.badguy}> предоставил доказательства отработки:\n${proofs}`,
		});

		await addInWaitingQueue(approveMessage.id, report.id);
	},
};
