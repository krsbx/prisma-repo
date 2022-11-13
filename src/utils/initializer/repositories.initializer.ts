import _ from 'lodash';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { logger, chalks, oras } from 'utils/logger';
import { getAllModelName } from 'utils/helper/models.helper';
import { DEFAULT_PATH, FILES_NAME } from 'utils/constants';
import { createModelStructures } from './prismaRepo.initializer';
import { createBaseRepository } from './baseRepository.initializer';
import { createRepository } from './repository.initializer';

export const createRespositories = async (prisma: string, settings: PR.PrismaRepoConfig) => {
  const spinner = oras('Creating repositories...\n').start();
  const { repositoryPath } = settings;

  const baseRepositoryPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}/${
    FILES_NAME.BASE_REPOSITORY
  }`;

  const baseRepoExists = fs.existsSync(baseRepositoryPath);

  try {
    const modelsName = getAllModelName(prisma);

    await Promise.all(
      _.map(modelsName, async (modelName) => createRepository(prisma, modelName, settings, false))
    );

    spinner.succeed(chalks.green.bold('Repositories created'));

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma, settings);

    if (!baseRepoExists) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma, settings);
    }
  } catch {
    spinner.fail(chalks.red.bold('Repository creation failed'));
  }
};
