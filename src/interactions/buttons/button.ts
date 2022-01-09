import { MessageButton, MessageButtonStyleResolvable } from 'discord.js';

export const createButton = (id: string, label: string, style: MessageButtonStyleResolvable = 'PRIMARY') =>
	new MessageButton()
		.setCustomId(id)
		.setLabel(label)
		.setStyle(style);
