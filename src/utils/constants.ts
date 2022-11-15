import appRootPath from 'app-root-path';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const TYPE_SUFFIX = {
  WHERE_INPUT: 'WhereInput',
  SELECT: 'Select',
  INCLUDE: 'Include',
  CREATE_INPUT: 'CreateInput',
  UPDATE_INPUT: 'UpdateInput',
  WHERE_UNIQUE_INPUT: 'WhereUniqueInput',
  ORDER_BY_WITH_RELATION_INPUT: 'OrderByWithRelationInput',
  DELEGATE: 'Delegate',
  GROUP_BY: 'GroupByOutputType',
} as const;

export const DEFAULT_MODEL_TYPES = {
  [TYPE_SUFFIX.WHERE_INPUT]: 'unknown',
  [TYPE_SUFFIX.SELECT]: 'unknown',
  [TYPE_SUFFIX.INCLUDE]: 'unknown',
  [TYPE_SUFFIX.CREATE_INPUT]: 'unknown',
  [TYPE_SUFFIX.UPDATE_INPUT]: 'unknown',
  [TYPE_SUFFIX.WHERE_UNIQUE_INPUT]: 'unknown',
  [TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT]: 'unknown',
  [TYPE_SUFFIX.DELEGATE]: 'unknown',
  [TYPE_SUFFIX.GROUP_BY]: 'unknown',
} as const;

export const COLOR_SCHEME = {
  BRIGHT_RED: '#E2180A',
  BRIGHT_ORANGE: '#F34B8C',
  BRIGHT_PURPLE: '#C8184F',
  BRIGHT_GREEN: '#52A849',
  DARK_GREEN: '19511E',
};

export const APP_TITLE = 'PRISMA REPO GENERATOR';

export const DEFAULT_CLI_RESULTS: PR.CliResults = {
  modelname: '',
  flags: {
    settings: '',
    repositories: false,
    baseRepository: false,
    modelStructures: false,
  },
};

export const DEFAULT_PATH = {
  REPOSITORY: 'src/repository',
  TYPES: 'src/types',
  PRISMA_DEFINITION: `${appRootPath}/node_modules/.prisma/client/index.d.ts`,
} as const;

export const PACKAGE_NAME = 'prisma-repo' as const;

export const FILES_NAME = {
  BASE_REPOSITORY: 'baseRepository.ts',
  MODELS: `${PACKAGE_NAME}.ts`,
  TYPES: {
    EXPRESS: 'express.d.ts',
  },
} as const;

export const CONFIG_FILE_NAMES = {
  JSON: 'repository.setting.json',
  JS: 'repository.setting.js',
  MJS: 'repository.setting.mjs',
  TS: 'repository.setting.ts',
} as const;

export const PRISMA_LOGGER = {
  QUERY: 'query',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;
