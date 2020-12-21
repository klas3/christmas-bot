import { Role } from 'discord.js';
import client from '.';
import * as botConfig from './configurations/botConfig.json';

const { colors, garlandInterval } = botConfig;

class Garland {
  private interval?: NodeJS.Timeout;
  private role?: Role;
  private currentBeamIndex: number = 0;

  constructor(guildId: string, roleId: string) {
    this.role = client.guilds.cache.get(guildId)?.roles.cache.get(roleId) as Role;
  }

  public turnOn = async () => {
    this.interval = setInterval(this.changeColor, garlandInterval);
  };

  public turnOff = () => {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;
  };

  private changeColor = async () => {
    if (!this.role) {
      return;
    }
    let beamIndex = Math.floor(Math.random() * colors.length);
    while (beamIndex === this.currentBeamIndex) {
      beamIndex = Math.floor(Math.random() * colors.length);
    }
    await this.role.setColor(colors[beamIndex]);
    this.currentBeamIndex = beamIndex;
  };
}

export default Garland;
