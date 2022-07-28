import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { importer, interfaces, prismaInstance } from '../template/models';
import {
  generateModelStructures,
  getAllModelName,
  generateModelsPrismaTypes,
  getAllModelTypes,
  generateModelNameConstants,
} from '../utils/models';
import {
  DEFAULT_PATH,
  FILES_NAME,
  MODEL_DELEGATE,
  MODEL_NAME,
  MODEL_SCALAR_FIELDS,
} from '../utils/constants';
import { PrismaRepoConfig } from '../utils/interface';
import { expressTypesBuilder } from '../utils/builder';
import { generatePrismaLogger } from '../utils/common';

const createModelStructures = async (prisma: string, settings: PrismaRepoConfig) => {
  const spinner = ora('Creating model structures..\n.').start();
  const { repositoryPath, typesPath, extendExpress } = settings;

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const typesDirPath = `${appRootPath}/${typesPath ?? DEFAULT_PATH.TYPES}`;

  const filePath = `${repositoryDirPath}/${FILES_NAME.MODELS}`;
  const typesFilePath = `${typesDirPath}/${FILES_NAME.TYPES.EXPRESS}`;

  try {
    const modelNames = getAllModelName(prisma);
    const modelNameConstants = generateModelNameConstants(modelNames);
    const modelStructures = generateModelStructures(modelNames);
    const modelsTypes = getAllModelTypes(prisma, modelNames);
    const modelsPrismaTypes = generateModelsPrismaTypes(modelNames, modelsTypes);
    const expressTypes = expressTypesBuilder(modelNames);
    const prismaLoggerSettings = JSON.stringify(
      generatePrismaLogger(settings.prismaLogger ?? false)
    );

    let models =
      '//! Do not edit this file manually, it is generate by `prisma repo generator`\n\n';

    models += `${importer.lodash}\n`;
    models += `${importer.start} `;
    models += modelNames.join(', ');
    models += ` ${importer.end}\n\n`;

    models += `${interfaces.anyRecord}\n\n`;
    models += `${interfaces.baseOption}\n\n`;
    models += `${interfaces.find}\n\n`;

    models += `${prismaInstance.prisma(prismaLoggerSettings)}\n\n`;
    models += `${prismaInstance.models}\n\n`;

    models += `${modelNameConstants}\n\n`;

    models += `${modelStructures}\n\n`;
    models += `${MODEL_NAME}\n\n`;
    models += `${MODEL_SCALAR_FIELDS}\n\n`;
    models += `${MODEL_DELEGATE}\n\n`;

    models += `${modelsPrismaTypes}\n`;

    if (!fs.existsSync(repositoryDirPath)) {
      await fs.mkdir(repositoryDirPath);
    }

    if (extendExpress && !fs.existsSync(typesDirPath)) {
      await fs.mkdir(typesDirPath);
    }

    await Promise.all([
      fs.writeFile(filePath, models),
      extendExpress ? fs.writeFile(typesFilePath, expressTypes) : Promise.resolve(),
    ]);

    spinner.succeed(chalk.green.bold('Model structures created'));
  } catch {
    spinner.fail(chalk.red.bold('Model structures creation failed'));
  }
};

export default createModelStructures;
