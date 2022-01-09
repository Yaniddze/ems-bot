import { MessageSelectMenu, MessageSelectOptionData } from 'discord.js';

export const createSelect = (placeholder: string, options: MessageSelectOptionData[], id: string = '') =>
	new MessageSelectMenu()
		.setCustomId(id)
		.setPlaceholder(placeholder)
		.addOptions(options);
