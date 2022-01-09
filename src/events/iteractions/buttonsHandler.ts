import { ButtonInteraction } from 'discord.js';

import * as buttons from './buttons';
import { ButtonHandler } from './buttons/types';

export async function executeButtonInteraction(interaction: ButtonInteraction) {
	try {
		Object.keys(buttons).map(async innerButton => {
			const foundButton = (buttons as { [key: string]: ButtonHandler })[innerButton];

			if (foundButton.getChannelId() === interaction.channelId) {
				await foundButton.handle(interaction);
			}
		});
	} catch (err) {
		console.error(err);
	}
}
