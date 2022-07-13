import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import logger from '../utils/logger';
import createModelStructures from './models';
import baseRepository from '../template/baseRepository';

const createBaseRepository = async (prisma: string) => {
  const spinner = ora('Creating base repository...\n').start();

  try {
    await fs.writeFile('./src/baseRepository.ts', baseRepository);

    spinner.succeed(chalk.green.bold('Base repository created'));

    if (!fs.existsSync('./src/models.ts')) {
      logger.warn('[Warn]: Model structures not found!');
      createModelStructures(prisma);
    }
  } catch {
    spinner.fail(chalk.red.bold('Base repository creation failed'));
  }
};

export default createBaseRepository;
