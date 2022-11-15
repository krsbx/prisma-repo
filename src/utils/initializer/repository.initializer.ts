import _ from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { logger, chalks, oras } from 'utils/logger';
import templateFile from 'template-file';
import { checkModelExist, checkShouldOverwrite } from 'utils/helper/checker.helper';
import { DEFAULT_PATH, FILES_NAME, PKG_ROOT } from 'utils/constants';
import { createModelStructures } from './prismaRepo.initializer';
import { createBaseRepository } from './baseRepository.initializer';

export const createRepository = async (
  prisma: string,
  modelName: string,
  settings: PR.PrismaRepoConfig,
  shouldUpdate = true
) => {
  const spinner = oras(`Creating repository for model ${modelName}...\n`).start();
  const { repositoryPath, overwrite } = settings;

  if (!checkModelExist(prisma, modelName)) {
    spinner.fail(`Model ${modelName} does not exist`);
    return;
  }

  const isShouldOverwrite = checkShouldOverwrite(overwrite, 'repository');

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;
  const filePath = `${repositoryDirPath}/${_.camelCase(modelName)}.ts`;
  const baseRepositoryPath = `${repositoryDirPath}/${FILES_NAME.BASE_REPOSITORY}`;

  const fileExists = fs.existsSync(filePath);
  const directoryExists = fs.existsSync(repositoryDirPath);
  const baseRepoExists = fs.existsSync(baseRepositoryPath);

  const rootDir = path.join(PKG_ROOT, 'template');
  const templatePath = path.join(rootDir, 'repository.ts');

  try {
    if (!directoryExists) {
      await fs.mkdirp(repositoryDirPath);
    }

    if (isShouldOverwrite || !fileExists) {
      const template = await templateFile.renderFile(templatePath, {
        repository: modelName,
        repositoryName: `MODELS_NAME.${_.constantCase(modelName)}`,
      });

      await fs.writeFile(filePath, template);
    } else {
      spinner.fail(`Repository for model \`${modelName}\` already exists`);
      spinner.fail(`Overwriting is disabled by default, enable it in the config file`);
      return;
    }

    spinner.succeed(chalks.green.bold(`Repository for model ${modelName} created`));

    if (!shouldUpdate) return;

    logger.info('[Info]: Updating Model Structures!');
    await createModelStructures(prisma, settings);

    if (!baseRepoExists) {
      logger.warn('[Warn]: Base repository not found!');
      await createBaseRepository(prisma, settings);
    }
  } catch {
    spinner.fail(chalks.red.bold(`Repository creation failed for model ${modelName}`));
  }
};
