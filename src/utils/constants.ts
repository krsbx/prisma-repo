// eslint-disable-next-line import/no-cycle
import { CliResults } from './interface';

export const TYPE_SUFFIX = {
  WHERE_INPUT: 'WhereInput',
  SELECT: 'Select',
  INCLUDE: 'Include',
  CREATE_INPUT: 'CreateInput',
  UPDATE_INPUT: 'UpdateInput',
  WHERE_UNIQUE_INPUT: 'WhereUniqueInput',
  ORDER_BY_WITH_RELATION_INPUT: 'OrderByWithRelationInput',
} as const;

export const MOST_COMMON_TYPE = 'Aggregate';

export const TYPES_NAMES = {
  MODEL_NAME: 'ModelName',
  MODEL_STRUCTURE: 'ModelStructure',
  MODEL_SCALAR_FIELDS: 'ModelScalarFields',
  MODEL_TYPES: 'ModelTypes',
} as const;

export const DEFAULT_MODEL_TYPES = {
  [TYPE_SUFFIX.WHERE_INPUT]: 'unknown',
  [TYPE_SUFFIX.SELECT]: 'unknown',
  [TYPE_SUFFIX.INCLUDE]: 'unknown',
  [TYPE_SUFFIX.CREATE_INPUT]: 'unknown',
  [TYPE_SUFFIX.UPDATE_INPUT]: 'unknown',
  [TYPE_SUFFIX.WHERE_UNIQUE_INPUT]: 'unknown',
  [TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT]: 'unknown',
} as const;

export const MODELS_CONSTANTS_NAMES = 'MODELS_NAME' as const;

export const EXPORT_TYPE = 'export type' as const;

export const EXPORT_INTERFACE = 'export interface' as const;

export const EXPORT_CONST = 'export const' as const;

export const INTERFACE_NAME = {
  ANY_RECORD: 'AnyRecord',
  BASE_OPTION: 'BaseOption',
  FIND: 'Find',
} as const;

export const INSTANCE_NAME = {
  PRISMA: 'prisma',
  MODELS: 'models',
} as const;

export const IMPORT_LIBRARY = {
  LODASH: "import _ from 'lodash';",
  PRISMA: "import { Prisma } from '@prisma/client';",
} as const;

export const COLOR_SCHEME = {
  BRIGHT_RED: '#E2180A',
  BRIGHT_ORANGE: '#F34B8C',
  BRIGHT_PURPLE: '#C8184F',
  BRIGHT_GREEN: '#52A849',
  DARK_GREEN: '19511E',
};

export const APP_TITLE = 'PRISMA REPO GENERATOR';

export const DEFAULT_CLI_RESULTS: CliResults = {
  modelname: '',
  repositories: false,
  baseRepository: false,
  modelStructures: false,
};

export const REPOSITORY_TYPE = {
  WHERE: 'Where',
  SELECT: 'Select',
  INCLUDE: 'Include',
  CREATE: 'Create',
  UPDATE: 'Update',
  CURSOR: 'Cursor',
  ORDER: 'Order',
  DISTINCT: 'Distinct',
} as const;

export const PRISMA_TYPES = {
  PRISMA: 'Prisma',
  ENUMERABLE: 'Prisma.Enumerable',
  BATCH_PAYLOAD: 'Prisma.BatchPayload',
} as const;

export const BASE_REPOSITORY_MODEL_NAME = 'this.model' as const;

export const MODEL_NAME_TYPE = `typeof ${BASE_REPOSITORY_MODEL_NAME}` as const;

export const BASE_REPOSITORY_BASE_TYPE = {
  WHERE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.WHERE}']`,
  SELECT: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.SELECT}']`,
  INCLUDE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.INCLUDE}']`,
  CREATE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.CREATE}']`,
  UPDATE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.UPDATE}']`,
  CURSOR: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.CURSOR}']`,
  ORDER: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.ORDER}']`,
} as const;

export const BASE_REPOSITORY_TYPE = {
  EXTEND_MODEL_NAME: `T extends ${MODEL_NAME_TYPE}`,
  QUERY_CONDITIONS: `${BASE_REPOSITORY_BASE_TYPE.WHERE} | number | string`,
  CREATE_UPDATE_OPTION: `${INTERFACE_NAME.BASE_OPTION}<${BASE_REPOSITORY_BASE_TYPE.INCLUDE}, ${BASE_REPOSITORY_BASE_TYPE.SELECT}>`,
  ENUMERABLE_CREATE: `${PRISMA_TYPES.ENUMERABLE}<${BASE_REPOSITORY_BASE_TYPE.CREATE}>`,
  ENUMERABLE_UPDATE: `${PRISMA_TYPES.ENUMERABLE}<${BASE_REPOSITORY_BASE_TYPE.UPDATE}>`,
  FIND_OPTION: `${INTERFACE_NAME.FIND}<${BASE_REPOSITORY_BASE_TYPE.SELECT}, ${BASE_REPOSITORY_BASE_TYPE.INCLUDE}, ${BASE_REPOSITORY_BASE_TYPE.CURSOR}, ${BASE_REPOSITORY_BASE_TYPE.ORDER}, ${TYPES_NAMES.MODEL_SCALAR_FIELDS}<${MODEL_NAME_TYPE}>>`,
  UPDATE_CREATE_PAYLOAD: `${BASE_REPOSITORY_BASE_TYPE.UPDATE} | ${BASE_REPOSITORY_BASE_TYPE.CREATE}`,
  MODEL_STRUCTURE: `${TYPES_NAMES.MODEL_STRUCTURE}[T]`,
  ...BASE_REPOSITORY_BASE_TYPE,
} as const;

export const MODEL_NAME =
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_NAME} = keyof ${TYPES_NAMES.MODEL_STRUCTURE};` as const;

export const MODEL_SCALAR_FIELDS =
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_SCALAR_FIELDS}<T extends keyof ${TYPES_NAMES.MODEL_STRUCTURE}> = ${TYPES_NAMES.MODEL_STRUCTURE}[T];` as const;

export const DEFAULT_PATH = 'src/repository' as const;

export const FILES_NAME = {
  BASE_REPOSITORY: 'baseRepository.ts',
  MODELS: 'models.ts',
} as const;

export const CONFIG_FILE_NAMES = {
  JSON: 'repository.setting.json',
  JS: 'repository.setting.js',
  MJS: 'repository.setting.mjs',
  TS: 'repository.setting.ts',
} as const;
