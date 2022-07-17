import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import logger from '../utils/logger';
import createModelStructures from './models';
import createBaseRepository from './baseRepository';
import { getAllModelName } from '../utils/models';
import createRepository from './repository';
import { PrismaRepoConfig } from '../utils/interface';
import { DEFAULT_PATH, FILES_NAME } from '../utils/constants';

const createRespositories = async (prisma: string, settings: PrismaRepoConfig) => {
  const spinner = ora('Creating repositories...\n').start();
  const { repositoryPath } = settings;

  const baseRepositoryPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}/${
    FILES_NAME.BASE_REPOSITORY
  }`;

  const baseRepoExists = fs.existsSync(baseRepositoryPath);

  try {
    const modelsName = getAllModelName(prisma);

    await Promise.all(
      _.map(modelsName, async (modelName) => createRepository(prisma, modelName, settings))
    );

    spinner.succeed(chalk.green.bold('Repositories created'));

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma, settings);

    if (!baseRepoExists) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma, settings);
    }
  } catch {
    spinner.fail(chalk.red.bold('Repository creation failed'));
  }
};

export default createRespositories;
