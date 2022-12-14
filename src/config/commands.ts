import fs from 'fs';
import { Command } from '../protocols/commands';

export const useCommands = async () => {
  const commands: Array<[string, Command]> = await Promise.all(
    fs.readdirSync('./src/commands').map(async (file) => {
      const command = (await import(`../commands/${file}`)).default;
      return [
        command.name,
        { name: command.name, description: command.description, handle: command.handle }
      ];
    })
  );

  return new Map<string, Command>(commands);
};

// (async () => {
//   const a = await useCommands();
//   console.log(a);
//   const b = Array.from(a.values());
//   console.log(b);
// })();
