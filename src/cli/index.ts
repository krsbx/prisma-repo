import _ from 'lodash';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { Command } from 'commander';
import { APP_TITLE, DEFAULT_CLI_RESULTS, DEFAULT_PATH } from '../utils/constants';
import logger from '../utils/logger';
import createBaseRepository from './baseRepository';
import createModelStructures from './models';
import createRepository from './repository';
import createRespositories from './repositories';
import { PrismaRepoConfig } from '../utils/interface';
import { getSettings, getSettingsFromPath } from '../utils/common';

const runCli = async () => {
  const program = new Command().name(APP_TITLE);

  let cliResults = DEFAULT_CLI_RESULTS;

  let settings: PrismaRepoConfig = {};

  program
    .description('Use Prisma with repository pattern')
    .option('--repositories', 'Generate all repositories')
    .option(
      '--modelname <modelname>',
      'Name of the model for the repository to be generated (case sensitive))'
    )
    .option('--base-repository', 'Create a base repository', false)
    .option('--model-structures', 'Update model.ts with the generated structures', false)
    .option('--settings <settings>', 'Use specific settings from args', '')
    .parse(process.argv);

  cliResults = program.opts();

  const modelname = program.args[0];
  if (!_.isEmpty(modelname)) cliResults.modelname = modelname;

  if (cliResults.settings.trim() !== '') settings = await getSettingsFromPath(cliResults.settings);
  else settings = await getSettings();

  const prisma = await fs.readFile(`${appRootPath}/node_modules/.prisma/client/index.d.ts`, 'utf8');

  const repositoryDirPath = `${appRootPath}/${settings.repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const repositoryDirExist = fs.existsSync(repositoryDirPath);

  try {
    if (!repositoryDirExist) {
      await fs.mkdirp(repositoryDirPath);
    }

    if (cliResults.repositories) {
      await createRespositories(prisma, settings);
      return;
    }

    if (cliResults.modelStructures) {
      await createModelStructures(prisma, settings);
    }

    if (cliResults.baseRepository) {
      await createBaseRepository(prisma, settings);
    }

    if (!_.isEmpty(cliResults.modelname)) {
      await createRepository(prisma, cliResults.modelname, settings);
    }
  } catch (err) {
    if (err instanceof Error && (err as any).isTTYError) {
      logger.error(`${APP_TITLE} needs an interactive terminal to provide options`);
    } else {
      throw err;
    }
  }
};

export default runCli;
