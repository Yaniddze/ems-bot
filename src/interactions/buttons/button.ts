import { MessageButton, MessageButtonStyleResolvable } from 'discord.js';

export const createButton = (label: string, id: string = '', style: MessageButtonStyleResolvable = 'PRIMARY') =>
	new MessageButton()
		.setCustomId(id)
		.setLabel(label)
		.setStyle(style);
