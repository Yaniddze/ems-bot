import { Message } from 'discord.js';

import { Event } from './types';

import * as messages from './newMessages';
import { NewMessageHandler } from './newMessages/types';

export const messageCreate: Event = {
	async execute(message: Message) {
		Object.keys(messages).forEach(async localMessage => {
			const currentMessage = messages[localMessage] as NewMessageHandler;
			if (currentMessage.getChannel() === message.channelId) {
				try {
					await currentMessage.handle(message);
				} catch (e) {
					console.log(e);
				}
			}
		});
	},
};
