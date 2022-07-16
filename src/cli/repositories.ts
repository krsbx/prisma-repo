import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import logger from '../utils/logger';
import createModelStructures from './models';
import createBaseRepository from './baseRepository';
import { getAllModelName } from '../utils/models';
import createRepository from './repository';

const createRespositories = async (prisma: string) => {
  const spinner = ora('Creating repositories...\n').start();

  try {
    const modelsName = getAllModelName(prisma);

    await Promise.all(_.map(modelsName, async (modelName) => createRepository(prisma, modelName)));

    spinner.succeed(chalk.green.bold('Repositories created'));

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma);

    if (!fs.existsSync('./src/baseRepository.ts')) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma);
    }
  } catch {
    spinner.fail(chalk.red.bold('Repository creation failed'));
  }
};

export default createRespositories;
