import { Interaction } from 'discord.js';
import { executeCommandInteraction, executeButtonInteraction } from './iteractions';

import { Event } from './types';

export const interactionCreate: Event = {
	async execute(interaction: Interaction) {
		if (interaction.isCommand()) {
			return executeCommandInteraction(interaction);
		}

		if (interaction.isButton()) {
			return executeButtonInteraction(interaction);
		}
	},
};
