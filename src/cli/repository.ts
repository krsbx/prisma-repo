import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import { importer } from '../template/repository';
import { getModelTypes, isModelExists } from '../utils/common';
import { repositoryBuilder, repositoryExtendsBuilder } from '../utils/builder';
import logger from '../utils/logger';
import createModelStructures from './models';
import createBaseRepository from './baseRepository';

const createRepository = async (prisma: string, modelName: string) => {
  const spinner = ora(`Creating repository for model ${modelName}...\n`).start();

  try {
    if (!isModelExists(prisma, modelName)) {
      spinner.fail(`Model ${modelName} does not exist`);
      return;
    }

    const modelTypes = getModelTypes(prisma, modelName);

    let model = '';

    model += `${importer.lodash}\n`;
    model += `${importer.prisma}\n`;
    model += `${importer.factory}\n`;
    model += `${importer.types}\n\n`;

    model += `${repositoryBuilder(modelName, JSON.parse(modelTypes))}\n\n`;
    model += `${repositoryExtendsBuilder(modelName)}`;

    await fs.writeFile(`./src/${_.camelCase(modelName)}.ts`, model);

    spinner.succeed(chalk.green.bold(`Repository for model ${modelName} created`));

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma);

    if (!fs.existsSync('./src/baseRepository.ts')) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma);
    }
  } catch {
    spinner.fail(chalk.red.bold(`Repository creation failed for model ${modelName}`));
  }
};

export default createRepository;
