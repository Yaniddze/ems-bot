import { Message } from 'discord.js';

export type NewMessageHandler = {
	getChannel: () => string;
	handle: (message: Message) => Promise<void>;
};
