import { Message } from 'discord.js';

export type UpdateMessageHandler = {
	getChannel: () => string;
	handle: (oldMessage: Message, newMessage: Message) => Promise<void>;
};
