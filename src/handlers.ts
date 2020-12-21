import { Guild } from 'discord.js';
import Garland from './garland';
import { garlands } from './index';

export const turnOnGarlands = (guild: Guild) => {
  guild.members.cache.forEach((member) => {
    const roleId = member.roles.highest.id;
    if (garlands.get(roleId) || member.user.bot) {
      return;
    }
    const garland = new Garland(guild?.id as string, roleId);
    garland.turnOn();
    garlands.set(roleId, garland);
  });
};

export const turnOffGarlands = (guild: Guild) => {
  guild.roles.cache.forEach((role) => {
    const garland = garlands.get(role.id);
    if (!garland) {
      return;
    }
    garland.turnOff();
    garlands.delete(role.id);
  });
};
