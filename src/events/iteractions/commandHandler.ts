import { CommandInteraction } from 'discord.js';
import * as commands from './commands';

import { Command } from './commands/types';

export async function executeCommandInteraction(interaction: CommandInteraction) {
	try {
		Object.keys(commands).forEach(async name => {
			const command = ((commands as unknown) as { [key: string]: Command })[name];

			if (interaction.commandName === command.name) {
				if (command.channelId !== undefined && command.channelId() !== interaction.channelId) {
					return interaction.reply({
						content: `Эту комманду можно применять только в чате <#${command.channelId()}>`,
						ephemeral: true,
					});
				} else {
					await command.execute(interaction);
				}
			}
		});
	} catch (err) {
		console.error(err);

		return interaction.reply({
			content: 'При выполнении произошла ошибка',
			ephemeral: true,
		});
	}
}
