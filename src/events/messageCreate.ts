import { Client, Message } from 'discord.js';
import * as messages from './messages';

export const messageCreateEvent = {
  name: 'messageCreate',
  async execute(client: Client, message: Message) {
    Object.keys(messages).forEach(async localMessage => {
      if (messages[localMessage].channel === message.channelId) {
        try {
          await messages[localMessage].handler(client, message);
        } catch (e) {
          console.log(e);
        }
      }
    });
  },
};
