import _ from 'lodash';
import fs from 'fs-extra';
import appRootPath from 'app-root-path';
import { execAsync } from 'utils/common';
import { CONFIG_FILE_NAMES, PACKAGE_NAME } from 'utils/constants';

const isPathValidExists = (filePath: string) => !_.isEmpty(filePath) && fs.existsSync(filePath);

export const loadJsonSettings = async (filePath = '') => {
  try {
    if (isPathValidExists(filePath)) return (await fs.readJson(filePath)) as PR.PrismaRepoConfig;

    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) return {};

    return (await fs.readJson(`${appRootPath}/${CONFIG_FILE_NAMES.JSON}`)) as PR.PrismaRepoConfig;
  } catch {
    return {};
  }
};

export const loadJsSettings = async (filePath = '') => {
  try {
    if (isPathValidExists(filePath)) return (await import(filePath)).default;

    if (!fs.existsSync(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)) return {};

    return (await import(`${appRootPath}/${CONFIG_FILE_NAMES.JS}`)).default;
  } catch {
    return {};
  }
};

export const loadTsSettings = async (filePath = '') => {
  try {
    let pathToLoad = `${appRootPath}/${CONFIG_FILE_NAMES.TS}`;

    if (isPathValidExists(filePath)) pathToLoad = filePath;

    if (!fs.existsSync(pathToLoad)) return {};

    await execAsync(
      `npx tsup ${pathToLoad} --format esm --clean --outDir node_modules/.${PACKAGE_NAME}`
    );

    const settings: PR.PrismaRepoConfig = (
      await import(`${appRootPath}/node_modules/.${PACKAGE_NAME}/${CONFIG_FILE_NAMES.MJS}`)
    ).default;

    return settings;
  } catch {
    return {};
  }
};

export const getSettings = async (filePath = '') => {
  let settings: PR.PrismaRepoConfig = {};

  settings = await loadJsonSettings(filePath);

  if (_.isEmpty(settings)) {
    settings = await loadJsSettings(filePath);
  }

  if (_.isEmpty(settings)) {
    settings = await loadTsSettings(filePath);
  }

  return settings;
};

export const getSettingsFromPath = async (filePath = '') => {
  if (_.isEmpty(filePath)) return getSettings();

  return getSettings(filePath);
};
