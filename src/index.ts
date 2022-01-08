import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';

import * as events from './events';

config();

process.title = 'emsbot';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

Object.keys(events).forEach(key => {
  const event = events[key];

  const exec = async (...args) => {
    try {
      await event.execute(client, ...args);
    } catch (error) {
      console.log(error);
    }
  };

  if (event.once) {
    client.once(event.name, exec);
  } else {
    client.on(event.name, exec);
  }
});

client.login(process.env.BOT_TOKEN);
