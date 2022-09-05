import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { importer } from '../template/repository';
import { checkIsShouldOverwrite, isModelExists } from '../utils/common';
import { repositoryBuilder } from '../utils/builder';
import logger from '../utils/logger';
import createModelStructures from './models';
import createBaseRepository from './baseRepository';
import { PrismaRepoConfig } from '../utils/interface';
import { DEFAULT_PATH, FILES_NAME } from '../utils/constants';

const createRepository = async (prisma: string, modelName: string, settings: PrismaRepoConfig) => {
  const spinner = ora(`Creating repository for model ${modelName}...\n`).start();
  const { repositoryPath, overwrite } = settings;

  if (!isModelExists(prisma, modelName)) {
    spinner.fail(`Model ${modelName} does not exist`);
    return;
  }

  const isShouldOverwrite = checkIsShouldOverwrite(overwrite, 'repository');

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const filePath = `${repositoryDirPath}/${_.camelCase(modelName)}.ts`;
  const baseRepositoryPath = `${repositoryDirPath}/${FILES_NAME.BASE_REPOSITORY}`;

  const fileExists = fs.existsSync(filePath);
  const directoryExists = fs.existsSync(repositoryDirPath);
  const baseRepoExists = fs.existsSync(baseRepositoryPath);

  try {
    let model = '';

    model += `${importer.types}\n`;
    model += `${importer.baseRepository}\n\n`;

    model += `${repositoryBuilder(modelName)}\n`;

    if (!directoryExists) {
      await fs.mkdir(repositoryDirPath);
    }

    if (isShouldOverwrite || !fileExists) {
      await fs.writeFile(filePath, model);
    } else {
      spinner.fail(`Repository for model \`${modelName}\` already exists`);
      spinner.fail(`Overwriting is disabled by default, enable it in the config file`);
      return;
    }

    spinner.succeed(chalk.green.bold(`Repository for model ${modelName} created`));

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma, settings);

    if (!baseRepoExists) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma, settings);
    }
  } catch {
    spinner.fail(chalk.red.bold(`Repository creation failed for model ${modelName}`));
  }
};

export default createRepository;
