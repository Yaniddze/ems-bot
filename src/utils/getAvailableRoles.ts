import { GuildMemberRoleManager } from 'discord.js';

export const availableRoles = ['Устный 1/3', 'Устный 2/3', 'Устный 3/3', 'Строгий 1/3', 'Строгий 2/3', 'Строгий 3/3'];

export const getAvailableRoles = (manager: GuildMemberRoleManager) => {
	return manager.cache.filter(x => availableRoles.includes(x.name));
};
