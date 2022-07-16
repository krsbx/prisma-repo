import _ from 'lodash';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { EXPORT_TYPE, MOST_COMMON_TYPE } from './constants';
import { PrismaRepoConfig } from './interface';

export const toConstantCase = (value: string) => _.upperCase(value).replace(/ /g, '_');

export const isModelExists = (prisma: string, modelName: string) => {
  const prismaArray = prisma.split('\n');

  return prismaArray.some((line) =>
    line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}${modelName}) =`))
  );
};

export const getSettings = async () => {
  let settings: PrismaRepoConfig = {};

  if (fs.existsSync(`${appRootPath}/prisma-repo.json`)) {
    settings = await fs.readJson(`${appRootPath}/prisma-repo.json`);
  }

  if (_.isEmpty(settings)) {
    if (fs.existsSync(`${appRootPath}/repository.setting.js`)) {
      settings = (await import(`${appRootPath}/repository.setting.js`)).default;
    }
  }

  return settings;
};
