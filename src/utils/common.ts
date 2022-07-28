import _ from 'lodash';
import fs from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';
import appRootPath from 'app-root-path';
import { CONFIG_FILE_NAMES, EXPORT_TYPE, MOST_COMMON_TYPE } from './constants';
import { PrismaRepoConfig, PrismaRepoOverwrite } from './interface';

export const toConstantCase = (value: string) => _.upperCase(value).replace(/ /g, '_');

export const isModelExists = (prisma: string, modelName: string) => {
  const prismaArray = prisma.split('\n');

  return prismaArray.some((line) =>
    line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}${modelName}) =`))
  );
};

export const execAsync = promisify(exec);

export const loadJsonSettings = async () => {
  try {
    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) return {};

    return (await fs.readJson(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) as PrismaRepoConfig;
  } catch {
    return {};
  }
};

export const loadJsSettings = async () => {
  try {
    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)) return {};

    return (await import(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)).default;
  } catch {
    return {};
  }
};

export const loadTsSettings = async () => {
  try {
    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.TS}`)) return {};

    await execAsync(
      `npx tsup ${appRootPath}/${CONFIG_FILE_NAMES.TS} --format esm --clean --outDir node_modules/.prisma-repo`
    );

    const settings: PrismaRepoConfig = (
      await import(`${appRootPath}/node_modules/.prisma-repo/${CONFIG_FILE_NAMES.MJS}`)
    ).default;

    return settings;
  } catch {
    return {};
  }
};

export const getSettings = async () => {
  let settings: PrismaRepoConfig = {};

  settings = await loadJsonSettings();

  if (_.isEmpty(settings)) {
    settings = await loadJsSettings();
  }

  if (_.isEmpty(settings)) {
    settings = await loadTsSettings();
  }

  return settings;
};

export const checkIsShouldOverwrite = (
  overwrite: PrismaRepoConfig['overwrite'],
  types: keyof PrismaRepoOverwrite
) => {
  if (_.isNil(overwrite)) return false;

  if (_.isBoolean(overwrite)) return overwrite;

  return overwrite[types];
};
