import { Client, MessageComponentInteraction } from 'discord.js';

import * as commands from '../commands';
import { Command } from '../commands/types';

import { Event } from './types';

async function executeCommandInteraction(client: Client, interaction: MessageComponentInteraction) {
	try {
		Object.keys(commands).forEach(async name => {
			const command = ((commands as unknown) as { [key: string]: Command })[name];

			await command.execute(client, interaction);
		});
	} catch (err) {
		console.error(err);

		return interaction.reply({
			content: 'При выполнении произошла ошибка',
			ephemeral: true,
		});
	}
}

export const interactionCreate: Event = {
	async execute(client, interaction: MessageComponentInteraction) {
		if (interaction.isCommand()) {
			return executeCommandInteraction(client, interaction);
		}
	},
};
