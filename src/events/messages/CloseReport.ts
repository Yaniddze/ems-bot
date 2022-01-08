import { Client, Message } from 'discord.js';

import { removeFromAvailableRoles } from '../../utils';

export const CloseReportHandler = {
  channel: '928724129329344552',
  handler: async (client: Client, message: Message) => {
    const users = message.mentions.users.map(x => x);
    if (users.length === 0) return;
    const metionedUser = users[0];
    const found = await message.guild.members.search({
      query: metionedUser.username,
    });

    const foundUser = found.get(metionedUser.id);

    await removeFromAvailableRoles(foundUser);
  },
};
