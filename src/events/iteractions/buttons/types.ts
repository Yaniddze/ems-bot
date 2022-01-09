import { ButtonInteraction } from 'discord.js';

export type ButtonHandler = {
	getChannelId: () => string;
	handle: (interaction: ButtonInteraction) => Promise<void>;
};
