import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs/promises';
import { importer, interfaces, prismaInstance } from '../template/models';
import {
  generateModelName,
  generateModelScalarFields,
  generateModelStructures,
  getAllModelNames,
} from '../utils/common';

const createModelStructures = async (prisma: string) => {
  const spinner = ora('Creating model structures..\n.').start();

  try {
    const modelsNames = getAllModelNames(prisma);
    const modelStructure = generateModelStructures(modelsNames);
    const modelName = generateModelName();
    const modelScalarFields = generateModelScalarFields();

    let models = '';

    models += `${importer.lodash}\n`;
    models += `${importer.start} `;
    models += modelsNames.join(', ');
    models += ` ${importer.end}\n\n`;

    models += `${interfaces.anyRecord}\n\n`;
    models += `${interfaces.baseOption}\n\n`;
    models += `${interfaces.find}\n\n`;

    models += `${prismaInstance.prisma}\n\n`;
    models += `${prismaInstance.models}\n\n`;

    models += `${modelStructure}\n\n`;
    models += `${modelName}\n\n`;
    models += `${modelScalarFields}\n`;

    await fs.writeFile('./src/models.ts', models);

    spinner.succeed(chalk.green.bold('Model structures created'));
  } catch {
    spinner.fail(chalk.red.bold('Model structures creation failed'));
  }
};

export default createModelStructures;
