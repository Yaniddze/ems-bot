import { GuildMember } from 'discord.js';
import { getAvailableRoles } from './getAvailableRoles';

export const removeFromAvailableRoles = async (member: GuildMember) => {
	await member.roles.remove(getAvailableRoles(member.roles));
};
