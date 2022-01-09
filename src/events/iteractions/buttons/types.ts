import { ButtonInteraction, Client } from 'discord.js';

export type ButtonHandler = {
	getChannelId: () => string;
	handle: (client: Client, interaction: ButtonInteraction) => Promise<void>;
};
