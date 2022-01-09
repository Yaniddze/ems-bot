import { SelectMenuInteraction } from 'discord.js';

export type SelectHandler = {
	getChannelId: () => string;
	selectId: string;
	handle: (interaction: SelectMenuInteraction) => Promise<void>;
};
