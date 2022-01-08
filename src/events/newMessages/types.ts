import { Client, Message } from 'discord.js';

export type NewMessageHandler = {
	getChannel: () => string;
	handler: (client: Client, message: Message) => Promise<void>;
};
