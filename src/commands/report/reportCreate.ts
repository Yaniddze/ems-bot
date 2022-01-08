import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../types';

export const reportCreate: Command = {
	data: new SlashCommandBuilder()
		.setName('дать-выговор')
		.setDescription('Выдать выговор сотруднику (нарушителю)')
		.addUserOption(option =>
			option
				.setName('нарушитель')
				.setDescription('Имя и фамилия нарушителя')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('причина')
				.setDescription('Причина выдачи выговора')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('доказательства')
				.setDescription('Доказательства нарушения')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('отработка')
				.setDescription('Назначенная отработка')
				.setRequired(true),
		)
		.addIntegerOption(option =>
			option
				.setName('выговор')
				.setDescription('Выданный выговор')
				.addChoices([
					['Устный 2/3', 2],
					['Устный 3/3', 3],
					['Строгий 1/3', 4],
					['Строгий 2/3', 5],
					['Строгий 3/3', 6],
				]),
		),
	async execute(client, interaction) {
		console.log('Я сработал');
	},
};
