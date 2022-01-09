import { Interaction } from 'discord.js';
import { executeCommandInteraction, executeButtonInteraction } from './iteractions';

import { Event } from './types';

export const interactionCreate: Event = {
	async execute(_, interaction: Interaction) {
		if (interaction.isCommand()) {
			return await executeCommandInteraction(interaction);
		}

		if (interaction.isButton()) {
			return await executeButtonInteraction(interaction);
		}
	},
};
