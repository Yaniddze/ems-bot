import { GuildMemberRoleManager } from 'discord.js';

export const availableRoles = ['Устный 1', 'Устный 2', 'Устный 3', 'Строгий 1', 'Строгий 2', 'Строгий 3'];

export const getAvailableRoles = (manager: GuildMemberRoleManager) => {
	return manager.cache.filter(x => availableRoles.includes(x.name));
};
