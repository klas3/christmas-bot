import { Client } from 'discord.js';
import { config as configDotenv } from 'dotenv';
import * as botConfig from './configurations/botConfig.json';
import Garland from './garland';
import { turnOffGarlands, turnOnGarlands } from './handlers';

configDotenv();

const { activity, emojiBeams, prefix } = botConfig;

const client = new Client();

export const garlands: Map<string, Garland> = new Map<string, Garland>();

client.on('ready', async () => {
  if (!client.user) {
    return;
  }
  client.user.setActivity(activity);
  console.log('🎄 I am ready! 🎄');
});

client.on('message', (message) => {
  if (!message.guild) {
    return;
  }
  if (message.content.startsWith(`${prefix}lightsOn`)) {
    turnOnGarlands(message.guild);
    emojiBeams.forEach((beam) => message.react(beam));
  }
  if (message.content.startsWith(`${prefix}lightsOff`)) {
    turnOffGarlands(message.guild);
    message.react('👍');
  }
});

client.login(process.env.BOT_TOKEN);

export default client;
