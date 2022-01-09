import { GuildMember } from 'discord.js';

import { getAvailableRoles } from './getAvailableRoles';
import { removeUserReports } from '../database';

export const removeFromAvailableRoles = async (member: GuildMember) => {
	await member.roles.remove(getAvailableRoles(member.roles));
	await removeUserReports(member.id);
};
