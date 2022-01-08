import { Client, Message } from 'discord.js';

export type NewMessageHandler = {
	getChannel: () => string;
	handle: (client: Client, message: Message) => Promise<void>;
};
