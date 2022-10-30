import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import logger from '../utils/logger';
import createModelStructures from './models';
import baseRepository from '../template/baseRepository';
import { PrismaRepoConfig } from '../utils/interface';
import { DEFAULT_PATH, FILES_NAME } from '../utils/constants';
import { checkIsShouldOverwrite } from '../utils/common';

const createBaseRepository = async (prisma: string, settings: PrismaRepoConfig) => {
  const spinner = ora('Creating base repository...\n').start();
  const { repositoryPath, overwrite } = settings;

  const isShouldOverwrite = checkIsShouldOverwrite(overwrite, 'baseRepository');

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const filePath = `${repositoryDirPath}/${FILES_NAME.BASE_REPOSITORY}`;
  const modelsPath = `${repositoryDirPath}/${FILES_NAME.MODELS}`;

  const fileExists = fs.existsSync(filePath);
  const directoryExists = fs.existsSync(repositoryDirPath);
  const modelsExists = fs.existsSync(modelsPath);

  try {
    if (!directoryExists) {
      await fs.mkdirp(repositoryDirPath);
    }

    if (isShouldOverwrite || !fileExists) {
      await fs.writeFile(filePath, baseRepository);
    } else {
      spinner.fail(`baseRepository already exists`);
      spinner.fail(`Overwriting is disabled by default, enable it in the config file`);
      return;
    }

    spinner.succeed(chalk.green.bold('Base repository created'));

    if (!modelsExists) {
      logger.warn('[Warn]: Model structures not found!');
      createModelStructures(prisma, settings);
    }
  } catch {
    spinner.fail(chalk.red.bold('Base repository creation failed'));
  }
};

export default createBaseRepository;
