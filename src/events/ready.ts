import { Client } from "discord.js";

export const readyEvent = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		const botUser = client.user;

		botUser.setUsername('EMS Helper');
		botUser.setPresence({ status: 'dnd' });

		console.log(`Ready! Logged in as ${botUser}`);
	},
};
