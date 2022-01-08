import { Client, Message } from 'discord.js';

export type UpdateMessageHandler = {
	getChannel: () => string;
	handle: (client: Client, oldMessage: Message, newMessage: Message) => Promise<void>;
};
