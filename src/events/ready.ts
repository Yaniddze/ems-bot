import { registeringCommands } from '../utils';

import { Event } from './types';

export const ready: Event = {
	once: true,
	execute(client) {
		const user = client.user;

		user.setUsername('EMS Helper');
		user.setPresence({ status: 'dnd' });

		console.log(`Ready! Logged in as ${user.tag}`);

		registeringCommands(client);
	},
};
