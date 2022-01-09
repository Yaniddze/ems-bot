import { ButtonInteraction, Client } from 'discord.js';

import * as buttons from './buttons';
import { ButtonHandler } from './buttons/types';

export async function executeButtonInteraction(client: Client, interaction: ButtonInteraction) {
	try {
		Object.keys(buttons).map(async innerButton => {
			const foundButton = (buttons as { [key: string]: ButtonHandler })[innerButton];

			if (foundButton.getChannelId() === interaction.channelId) {
				await foundButton.handle(client, interaction);
			}
		});
	} catch (err) {
		console.error(err);
	}
}
