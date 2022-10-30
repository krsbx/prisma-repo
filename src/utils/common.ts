import _ from 'lodash';
import fs from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';
import appRootPath from 'app-root-path';
import {
  CONFIG_FILE_NAMES,
  EXPORT_TYPE,
  MOST_COMMON_TYPE,
  PACKAGE_NAME,
  PRISMA_LOGGER,
} from './constants';
import { PrismaLoggerType, PrismaRepoConfig, PrismaRepoOverwrite } from './interface';

export const toConstantCase = (value: string) => _.upperCase(value).replace(/ /g, '_');

export const isModelExists = (prisma: string, modelName: string) => {
  const prismaArray = prisma.split('\n');

  return prismaArray.some((line) =>
    line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}${modelName}) =`))
  );
};

export const execAsync = promisify(exec);

export const loadJsonSettings = async (path = '') => {
  try {
    if (fs.existsSync(path)) return (await fs.readJson(path)) as PrismaRepoConfig;

    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) return {};

    return (await fs.readJson(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) as PrismaRepoConfig;
  } catch {
    return {};
  }
};

export const loadJsSettings = async (path = '') => {
  try {
    if (fs.existsSync(path)) return (await import(path)).default;

    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)) return {};

    return (await import(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)).default;
  } catch {
    return {};
  }
};

export const loadTsSettings = async (path = '') => {
  try {
    if (fs.existsSync(path)) {
      await execAsync(
        `npx tsup ${path} --format esm --clean --outDir node_modules/.${PACKAGE_NAME}`
      );

      const settings: PrismaRepoConfig = (
        await import(`${appRootPath}/node_modules/.${PACKAGE_NAME}/${CONFIG_FILE_NAMES.MJS}`)
      ).default;

      return settings;
    }

    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.TS}`)) return {};

    await execAsync(
      `npx tsup ${appRootPath}/${CONFIG_FILE_NAMES.TS} --format esm --clean --outDir node_modules/.${PACKAGE_NAME}`
    );

    const settings: PrismaRepoConfig = (
      await import(`${appRootPath}/node_modules/.${PACKAGE_NAME}/${CONFIG_FILE_NAMES.MJS}`)
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

export const getSettingsFromPath = async (path: string) => {
  let settings: PrismaRepoConfig = {};

  const fileName = path.split('/').pop();

  if (!_.includes(CONFIG_FILE_NAMES, fileName)) return settings;

  switch (fileName) {
    case CONFIG_FILE_NAMES.JS:
      settings = await loadJsSettings(path);
      break;

    case CONFIG_FILE_NAMES.TS:
      settings = await loadTsSettings(path);
      break;

    case CONFIG_FILE_NAMES.JSON:
      settings = await loadJsonSettings(path);
      break;

    default:
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

export const generatePrismaLogger = (logger: PrismaRepoConfig['prismaLogger']) => {
  const convertToString = (value: PrismaLoggerType[]) =>
    `[${_(value)
      .map((type) => `'${type}'`)
      .join(', ')}]`;

  if (_.isBoolean(logger)) {
    if (logger) return convertToString(_.values(PRISMA_LOGGER));

    return '[]';
  }

  if (_.isArray(logger)) {
    return convertToString(logger);
  }

  const loggerSettings = _.reduce(
    logger,
    (curr, value, key) => {
      if (value) {
        curr.push(PRISMA_LOGGER[key as keyof typeof PRISMA_LOGGER]);
      }

      return curr;
    },
    [] as PrismaLoggerType[]
  );

  return convertToString(loggerSettings);
};
