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
  DELEGATE: 'Delegate',
} as const;

export const MOST_COMMON_TYPE = 'Aggregate';

export const TYPES_NAMES = {
  MODEL_NAME: 'ModelName',
  MODEL_STRUCTURE: 'ModelStructure',
  MODEL_SCALAR_FIELDS: 'ModelScalarFields',
  MODEL_TYPES: 'ModelTypes',
  MODEL_DELEGATE: 'ModelDelegate',
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
} as const;

export const MODELS_CONSTANTS_NAMES = 'MODELS_NAME' as const;

export const EXPORT_TYPE = 'export type' as const;

export const EXPORT_INTERFACE = 'export interface' as const;

export const EXPORT_CONST = 'export const' as const;

export const INTERFACE_NAME = {
  ANY_RECORD: 'AnyRecord',
  BASE_OPTION: 'BaseOption',
  FIND: 'Find',
  COUNT_ARGS: 'CountArgs',
  AGGREGATE: 'Aggregate',
  AGGREGATE_ARGS: 'AggregateArgs',
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
  DELEGATE: 'Delegate',
  SCALAR: 'Scalar',
  MODEL: 'Model',
} as const;

export const PRISMA_TYPES = {
  PRISMA: 'Prisma',
  ENUMERABLE: 'Prisma.Enumerable',
  BATCH_PAYLOAD: 'Prisma.BatchPayload',
  REJECT_ON_NOT_FOUND: 'Prisma.RejectOnNotFound',
  REJECT_PER_OPERATION: 'Prisma.RejectPerOperation',
} as const;

export const BASE_REPOSITORY_MODEL_NAME = 'this.modelName' as const;

export const MODEL_NAME_TYPE = `typeof ${BASE_REPOSITORY_MODEL_NAME}` as const;

export const BASE_REPOSITORY_BASE_TYPE = {
  WHERE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.WHERE}']`,
  SELECT: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.SELECT}']`,
  INCLUDE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.INCLUDE}']`,
  CREATE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.CREATE}']`,
  UPDATE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.UPDATE}']`,
  CURSOR: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.CURSOR}']`,
  ORDER: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.ORDER}']`,
  DELEGATE: `${TYPES_NAMES.MODEL_TYPES}[T]['${REPOSITORY_TYPE.DELEGATE}']`,
  SCALAR: `${TYPES_NAMES.MODEL_SCALAR_FIELDS}<T>`,
  CONSTRUCTOR: `${REPOSITORY_TYPE.WHERE}, ${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.CREATE}, ${REPOSITORY_TYPE.UPDATE}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DELEGATE}, ${REPOSITORY_TYPE.SCALAR}, ${REPOSITORY_TYPE.MODEL}`,
} as const;

export const BASE_REPOSITORY_TYPE = {
  EXTEND_MODEL_NAME: `T extends ${TYPES_NAMES.MODEL_NAME}`,
  QUERY_CONDITIONS: `${REPOSITORY_TYPE.WHERE} | number | string`,
  CREATE_UPDATE_OPTION: `${INTERFACE_NAME.BASE_OPTION}<${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.SELECT}>`,
  ENUMERABLE_CREATE: `${PRISMA_TYPES.ENUMERABLE}<${REPOSITORY_TYPE.CREATE}>`,
  ENUMERABLE_UPDATE: `${PRISMA_TYPES.ENUMERABLE}<${REPOSITORY_TYPE.UPDATE}>`,
  FIND_OPTION: `${INTERFACE_NAME.FIND}<${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.SCALAR}>`,
  UPDATE_CREATE_PAYLOAD: `${REPOSITORY_TYPE.UPDATE} | ${REPOSITORY_TYPE.CREATE}`,
  COUNT_OPTION: `${INTERFACE_NAME.COUNT_ARGS}<${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.SCALAR}>`,
  AGGREGATE_OPTION: `${INTERFACE_NAME.AGGREGATE}<${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.SCALAR}>`,
  AGGREGATE: `Omit<
      // @ts-ignore
      Parameters<typeof this.model.aggregate>[0],
      'cursor' | 'take' | 'skip' | 'orderBy'
    >`,
  MODEL_STRUCTURE: `${TYPES_NAMES.MODEL_STRUCTURE}[T]`,
} as const;

export const MODEL_NAME =
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_NAME} = keyof ${TYPES_NAMES.MODEL_STRUCTURE};` as const;

export const MODEL_SCALAR_FIELDS =
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_SCALAR_FIELDS}<T extends keyof ${TYPES_NAMES.MODEL_STRUCTURE}> = ${PRISMA_TYPES.ENUMERABLE}<keyof ${TYPES_NAMES.MODEL_STRUCTURE}[T]>;` as const;

export const MODEL_DELEGATE =
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_DELEGATE} = ${PRISMA_TYPES.REJECT_ON_NOT_FOUND} | ${PRISMA_TYPES.REJECT_PER_OPERATION} | undefined;` as const;

export const DEFAULT_PATH = {
  REPOSITORY: 'src/repository',
  TYPES: 'src/types',
} as const;

export const FILES_NAME = {
  BASE_REPOSITORY: 'baseRepository.ts',
  MODELS: 'models.ts',
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

export const CLASS_NAME = {
  BASE_REPOSITORY: 'BaseRepository',
  ABSTRACT_BASE_REPOSITORY: 'AbstractBaseRepository',
} as const;
