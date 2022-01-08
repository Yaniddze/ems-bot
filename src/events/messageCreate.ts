import { Client, Message } from 'discord.js';
import { Event } from './types';
import * as messages from './newMessages';

export const messageCreate: Event = {
	async execute(client: Client, message: Message) {
		Object.keys(messages).forEach(async localMessage => {
			if (messages[localMessage].getChannel() === message.channelId) {
				try {
					await messages[localMessage].handler(client, message);
				} catch (e) {
					console.log(e);
				}
			}
		});
	},
};
