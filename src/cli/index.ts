import _ from 'lodash';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { getSettingsFromPath } from 'utils/loader/settings.loader';
import { createRepository } from 'utils/initializer/repository.initializer';
import { createBaseRepository } from 'utils/initializer/baseRepository.initializer';
import { createRespositories } from 'utils/initializer/repositories.initializer';
import { createModelStructures } from 'utils/initializer/prismaRepo.initializer';
import { APP_TITLE, DEFAULT_PATH } from 'utils/constants';
import { createProgram } from 'utils/cli/program';
import { readFile } from 'utils/common';
import { logger } from 'utils/logger';

export const runCli = async () => {
  const cliResults = createProgram();

  const settings: PR.PrismaRepoConfig = await getSettingsFromPath(cliResults.flags.settings);

  const prisma = await readFile(DEFAULT_PATH.PRISMA_DEFINITION);

  const repositoryDirPath = `${appRootPath}/${settings.repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const repositoryDirExist = fs.existsSync(repositoryDirPath);

  try {
    if (!repositoryDirExist) await fs.mkdirp(repositoryDirPath);

    if (cliResults.flags.repositories) {
      createRespositories(prisma, settings);
      return;
    }

    if (cliResults.flags.modelStructures) {
      await createModelStructures(prisma, settings);
    }

    if (cliResults.flags.baseRepository) {
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
