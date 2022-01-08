import { Client, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type Command = {
	channelId?: () => string;
	data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	execute: (client: Client, interaction: CommandInteraction, ...args: any) => void | Promise<void>;
};
