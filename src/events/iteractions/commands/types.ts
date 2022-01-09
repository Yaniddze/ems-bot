import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type Command = {
	channelId?: () => string;
	name: string;
	data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	execute: (interaction: CommandInteraction, ...args: any) => void | Promise<void>;
};
