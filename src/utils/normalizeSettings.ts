import { Message } from 'discord.js';

export const normalizeSettings = (message: Message) => message.content.slice(8, message.content.length - 4);
