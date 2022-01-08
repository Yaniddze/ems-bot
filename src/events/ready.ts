import { Client } from 'discord.js';
import { Event } from './types';

export const ready: Event = {
	once: true,
	execute(client: Client) {
		const user = client.user;

		user.setUsername('EMS Helper');
		user.setPresence({ status: 'dnd' });

		console.log(`Ready! Logged in as ${user.tag}`);
	},
};
