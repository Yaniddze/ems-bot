import { GuildMemberRoleManager } from 'discord.js';

export const getAvailableRoles = (manager: GuildMemberRoleManager) => {
  const roles = [
    'Устный 1/3',
    'Устный 2/3',
    'Устный 3/3',
    'Строгий 1/3',
    'Строгий 2/3',
    'Строгий 3/3',
    'Еблан',
  ];

  return manager.cache.filter(x => roles.includes(x.name));
};
