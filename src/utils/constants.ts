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

export const REPOSITORY_TYPE = 'Where, Select, Include, Create, Update, Cursor, Order' as const;

export const EXTEND_MODEL_NAME = 'T extends typeof this.model' as const;
