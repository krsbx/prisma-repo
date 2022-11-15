import path from 'path';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { logger, chalks, oras } from 'utils/logger';
import { checkShouldOverwrite } from 'utils/helper/checker.helper';
import { DEFAULT_PATH, FILES_NAME, PKG_ROOT } from 'utils/constants';
import { createModelStructures } from './prismaRepo.initializer';

export const createBaseRepository = async (prisma: string, settings: PR.PrismaRepoConfig) => {
  const spinner = oras('Creating base repository...\n').start();
  const { repositoryPath, overwrite } = settings;

  const isShouldOverwrite = checkShouldOverwrite(overwrite, 'repository');

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const filePath = `${repositoryDirPath}/${FILES_NAME.BASE_REPOSITORY}`;
  const modelsPath = `${repositoryDirPath}/${FILES_NAME.MODELS}`;

  const fileExists = fs.existsSync(filePath);
  const directoryExists = fs.existsSync(repositoryDirPath);
  const modelsExists = fs.existsSync(modelsPath);

  const rootDir = path.join(PKG_ROOT, 'template');

  try {
    if (!directoryExists) {
      await fs.mkdirp(repositoryDirPath);
    }

    if (isShouldOverwrite || !fileExists) {
      await fs.copy(path.join(rootDir, FILES_NAME.BASE_REPOSITORY), filePath);
    } else {
      spinner.fail(`Base Repository already exists`);
      spinner.fail(`Overwriting is disabled by default, enable it in the config file`);
      return;
    }

    spinner.succeed(chalks.green.bold('Base repository created'));

    if (!modelsExists) {
      logger.warn('[Warn]: Model structures not found!');
      createModelStructures(prisma, settings);
    }
  } catch {
    spinner.fail(chalks.red.bold('Base repository creation failed'));
  }
};
