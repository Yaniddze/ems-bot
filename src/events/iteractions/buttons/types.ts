import { ButtonInteraction } from 'discord.js';

export type ButtonHandler = {
	getChannelId?: () => string;
	buttonId: string;
	handle: (interaction: ButtonInteraction) => Promise<void>;
};
