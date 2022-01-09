import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed } from 'discord.js';

import { getSettings } from '../../../../store';
import { getReports } from '../../../../database';

import { createSelect } from '../../../../interactions';

import { Command } from '../types';

export const reportClose: Command = {
	channelId: () => getSettings().createReportChatId,
	name: 'снять-выговор',
	data: new SlashCommandBuilder().setName('снять-выговор').setDescription('Снять выговор сотруднику (нарушителю)'),
	async execute(interaction) {
		const users = await getReports(interaction.user.id);

		const selectValues = await Promise.all(
			users.map(async x => {
				const user = await interaction.guild.members.fetch(x);

				return {
					label: user.nickname,
					value: x,
				};
			}),
		);

		if (selectValues.length === 0) {
			await interaction.reply({
				ephemeral: true,
				content: 'Не пользователей, с которых вы можете снять выговор',
			});
			return;
		}

		await interaction.reply({
			content: 'Выберите с кого снять выговор',
			ephemeral: true,
			components: [
				new MessageActionRow().addComponents(
					createSelect('Доступные пользователи', selectValues, 'снять выговор'),
				),
			],
		});
	},
};
