import fs from 'fs-extra';
import path from 'path';
import appRootPath from 'app-root-path';
import templateFile from 'template-file';
import { chalks, oras } from 'utils/logger';
import { DEFAULT_PATH, FILES_NAME, PKG_ROOT } from 'utils/constants';
import { getAllModelName, getAllModelTypes, getModelStructures } from 'utils/helper/models.helper';
import { getModelNameConstant } from 'utils/helper/constant.helper';
import { getPrismaLogger } from 'utils/helper/prisma.helper';

export const createModelStructures = async (prisma: string, settings: PR.PrismaRepoConfig) => {
  const spinner = oras('Creating model structures..\n.').start();
  const { repositoryPath } = settings;

  const repositoryDirPath = `${appRootPath}/${repositoryPath ?? DEFAULT_PATH.REPOSITORY}`;

  const filePath = `${repositoryDirPath}/${FILES_NAME.MODELS}`;

  const rootDir = path.join(PKG_ROOT, 'template');
  const templatePath = path.join(rootDir, FILES_NAME.MODELS);

  try {
    const modelNames = getAllModelName(prisma);
    const modelNameConstants = getModelNameConstant(modelNames);
    const modelStructure = getModelStructures(modelNames);
    const prismaLogger = getPrismaLogger(settings.prismaLogger);
    const modelTypes = getAllModelTypes(prisma, modelNames);

    const template = await templateFile.renderFile(templatePath, {
      log: prismaLogger,
      prismaStructures: modelNames,
      modelsName: modelNameConstants,
      modelStructure,
      modelTypes,
    });

    await fs.writeFile(filePath, template);

    spinner.succeed(chalks.green.bold('Model structures created'));
  } catch (e) {
    console.log(e);
    spinner.fail(chalks.red.bold('Model structures creation failed'));
  }
};
