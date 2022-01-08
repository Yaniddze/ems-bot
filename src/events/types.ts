import { Client } from 'discord.js';

export type Event = {
	once?: boolean;
	execute: (client: Client, ...args: any) => void | Promise<void>;
};
