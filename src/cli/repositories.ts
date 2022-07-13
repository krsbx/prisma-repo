import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import logger from '../utils/logger';
import { importer } from '../template/repository';
import createModelStructures from './models';
import createBaseRepository from './baseRepository';
import { getAllModelNames, getModelsTypes } from '../utils/common';
import { repositoryBuilder, repositoryExtendsBuilder } from '../utils/builder';

const createRespositories = async (prisma: string) => {
  const spinner = ora('Creating repositories...\n').start();

  try {
    const modelsName = getAllModelNames(prisma);
    const modelsTypes = getModelsTypes(prisma, modelsName);

    await Promise.all(
      _.map(modelsName, async (modelName, id) => {
        let model = '';

        model += `${importer.lodash}\n`;
        model += `${importer.prisma}\n`;
        model += `${importer.factory}\n`;
        model += `${importer.types}\n\n`;

        model += `${repositoryBuilder(modelName, modelsTypes[id])}\n\n`;
        model += `${repositoryExtendsBuilder(modelName)}`;

        return fs.writeFile(`./src/${_.camelCase(modelName)}.ts`, model);
      })
    );

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
