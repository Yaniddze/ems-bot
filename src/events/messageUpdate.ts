import { Message } from 'discord.js';
import { Event } from './types';
import * as messages from './updateMessages';
import { UpdateMessageHandler } from './updateMessages/types';

export const messageUpdate: Event = {
	async execute(oldMessage: Message, newMessage: Message) {
		Object.keys(messages).forEach(async localMessage => {
			const currentMessage = messages[localMessage] as UpdateMessageHandler;
			if (currentMessage.getChannel() === oldMessage.channelId) {
				try {
					await currentMessage.handle(oldMessage, newMessage);
				} catch (e) {
					console.log(e);
				}
			}
		});
	},
};
