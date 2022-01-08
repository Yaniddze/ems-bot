import 'dotenv/config.js';
import { Client, Intents } from 'discord.js';

import { initSettings } from './initSettings';

import * as events from './events';
import { Event } from './events/types';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

Object.keys(events).forEach(name => {
	const event = ((events as unknown) as { [key: string]: Event })[name];

	const execute = async (...args: any) => {
		try {
			await event.execute(client, ...args);
		} catch (error) {
			console.log(error);
		}
	};

	if (event.once) {
		client.once(name, execute);
	} else {
		client.on(name, execute);
	}
});

(async () => {
  await initSettings(client);
  await client.login(process.env.BOT_TOKEN);
})();
