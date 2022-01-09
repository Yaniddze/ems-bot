import { SelectMenuInteraction } from 'discord.js';

import * as selects from './selects';
import { SelectHandler } from './selects/types';

export async function executeSelectInteraction(interaction: SelectMenuInteraction) {
	try {
		Object.keys(selects).map(async innerSelect => {
			const foundSelect = (selects as { [key: string]: SelectHandler })[innerSelect];

			if (foundSelect.getChannelId() === interaction.channelId && interaction.customId === foundSelect.selectId) {
				await foundSelect.handle(interaction);
			}
		});
	} catch (err) {
		console.error(err);
	}
}
