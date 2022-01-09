import { ApplicationCommandDataResolvable, Client } from 'discord.js';

import * as commands from '../events/iteractions/commands';
import { Command } from '../events/iteractions/commands/types';

export const registeringCommands = (client: Client) => {
	const guildId = process.env.GUILD_ID;
	const commandsArray: Command['data'][] = [];

	Object.keys(commands).forEach(name => {
		const command = ((commands as unknown) as { [key: string]: Command })[name];

		commandsArray.push(command.data);
	});

	client.guilds.cache.get(guildId).commands.set((commandsArray as unknown) as ApplicationCommandDataResolvable[]);
};
