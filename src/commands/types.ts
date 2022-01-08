import { Client, MessageComponentInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type Command = {
	data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	execute: (client: Client, interaction: MessageComponentInteraction, ...args: any) => void | Promise<void>;
};
