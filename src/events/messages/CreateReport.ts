import { Client, Message } from 'discord.js';
import { removeFromAvailableRoles } from '../../utils';

export const CreateReportHandler = {
  channel: '928723416398331927',
  handler: async (client: Client, message: Message) => {
    const embed = message.embeds.find(
      x => x.title === 'Поступил новый выговор!',
    );

    if (embed === undefined) return;

    const roleName = embed.fields
      .find(x => x.name === 'Выданный выговор')
      .value.match(/([А-я]+ \d\/\d)/)[0];

    const guild = message.guild;

    const roleToSet = guild.roles.cache.find(x => x.name === roleName);

    const metionedUser = message.mentions.users.map(x => x)[0];
    const found = await guild.members.search({
      query: metionedUser.username,
    });

    const foundUser = found.get(metionedUser.id);

    await removeFromAvailableRoles(foundUser);
    await foundUser.roles.add(roleToSet);
  },
};
