import { prompt } from 'inquirer';
import { say } from '../utils';
import configMenu from './config';

export default async (): Promise<void> => {
  say('Welcome to Verter CLI', 'white');

  let exit = false;

  while (!exit) {
    const choices: string[] = [];

    choices.push('settings', 'Sair');

    const { option } = await prompt([
      {
        name: 'option',
        message: 'What would you like to do?',
        type: 'rawlist',
        choices,
      },
    ]);

    switch (option) {
      case 'settings':
        console.log('config');
        break;
      case 'exit':
        exit = true;
        break;
      default:
        exit = true;
    }
  }
};
