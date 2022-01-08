import { Client } from 'discord.js';

const availableSettingsChannelNames = [
  'настройки',
  'настройки ems-bot',
  'настройки emsbot',
  'emsbot settings',
];

export const initSettings = async (client: Client) => {
  const guilds = await client.guilds.fetch(process.env.GUILD_ID);
  const channels = await guilds.channels.fetch();
  const settingsChannel = channels.find(x =>
    availableSettingsChannelNames.includes(x.name.toLocaleLowerCase()),
  );
};
