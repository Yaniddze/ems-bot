import { Interaction } from 'discord.js';
import { executeCommandInteraction, executeButtonInteraction } from './iteractions';

import { Event } from './types';

export const interactionCreate: Event = {
	async execute(client, interaction: Interaction) {
		if (interaction.isCommand()) {
			return executeCommandInteraction(client, interaction);
		}
		if (interaction.isButton()) {
			return executeButtonInteraction(client, interaction);
		}
	},
};
