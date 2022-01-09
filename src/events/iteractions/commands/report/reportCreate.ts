import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageEmbed } from 'discord.js';

import { getSettings } from '../../../../store';

import { availableRoles } from '../../../../utils';
import { createButton } from '../../../../interactions';

import { Command } from '../types';

export const reportCreate: Command = {
	channelId: () => getSettings().createReportChatId,
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
					['Устный 1/3', 0],
					['Устный 2/3', 1],
					['Устный 3/3', 2],
					['Строгий 1/3', 3],
					['Строгий 2/3', 4],
					['Строгий 3/3', 5],
				]),
		),
	async execute(interaction) {
		const timeAndDateFormatter = new Intl.DateTimeFormat('ru', {
			hour: 'numeric',
			minute: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		const options = interaction.options;

		const goodGuy = interaction.user;
		const badGuy = options.getUser('нарушитель');
		const reason = options.getString('причина');
		const proofs = options.getString('доказательства');
		const workingOut = options.getString('отработка');
		let reportType = options.getInteger('выговор');

		const allRoles = await interaction.guild.roles.fetch();
		const foundUser = await interaction.guild.members.fetch(badGuy.id);

		if (reportType === null) {
			const foundRole = foundUser.roles.cache.find(x => availableRoles.includes(x.name));
			reportType = foundRole === undefined ? 0 : availableRoles.indexOf(foundRole.name) + 1;
		}

		reportType = reportType >= availableRoles.length ? availableRoles.length - 1 : reportType;

		const rightRole = allRoles.find(x => x.name === availableRoles[reportType]);

		const embed = new MessageEmbed()
			.setColor(rightRole.hexColor)
			.addFields({ name: 'Кто выдал выговор', value: `<@${goodGuy.id}>` })
			.addFields({ name: 'Нарушитель', value: `<@${badGuy.id}>` })
			.addFields({ name: 'Выданный выговор', value: `<@&${rightRole.id}>` })
			.addFields({ name: 'Причина', value: reason })
			.addFields({ name: 'Доказательства нарушения', value: proofs })
			.addFields({ name: 'Назначенная отработка', value: workingOut })
			.addFields({ name: 'Дата и время выдачи', value: timeAndDateFormatter.format(Date.now()) })
			.addFields({ name: 'Срок действия выговора', value: 'NULL' });

		await interaction.reply({
			ephemeral: true,
			embeds: [embed],
			components: [new MessageActionRow().addComponents(createButton('Отправить', 'SUCCESS'))],
		});
	},
};
