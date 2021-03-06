// eslint-disable-next-line import/no-cycle
import { TYPE_SUFFIX } from './constants';

export type ModelTypes<T extends string> = {
  [TYPE_SUFFIX.WHERE_INPUT]: `${T}${typeof TYPE_SUFFIX.WHERE_INPUT}` | 'unknown' | unknown;
  [TYPE_SUFFIX.SELECT]: `${T}${typeof TYPE_SUFFIX.SELECT}` | 'unknown' | unknown;
  [TYPE_SUFFIX.INCLUDE]: `${T}${typeof TYPE_SUFFIX.INCLUDE}` | 'unknown' | unknown;
  [TYPE_SUFFIX.CREATE_INPUT]: `${T}${typeof TYPE_SUFFIX.CREATE_INPUT}` | 'unknown' | unknown;
  [TYPE_SUFFIX.UPDATE_INPUT]: `${T}${typeof TYPE_SUFFIX.UPDATE_INPUT}` | 'unknown' | unknown;
  [TYPE_SUFFIX.WHERE_UNIQUE_INPUT]:
    | `${T}${typeof TYPE_SUFFIX.WHERE_UNIQUE_INPUT}`
    | 'unknown'
    | unknown;
  [TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT]:
    | `${T}${typeof TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT}`
    | 'unknown'
    | unknown;
  [TYPE_SUFFIX.DELEGATE]: `${T}${typeof TYPE_SUFFIX.DELEGATE}` | 'unknown' | unknown;
};

export type TypeSuffix = typeof TYPE_SUFFIX[keyof typeof TYPE_SUFFIX];

export type CliResults = {
  modelname: string;
  repositories: boolean;
  baseRepository: boolean;
  modelStructures: boolean;
};

export type PrismaRepoOverwrite = {
  repository?: boolean;
  baseRepository?: boolean;
};

export type PrismaLoggerType = 'query' | 'info' | 'warn' | 'error';

export type PrismaLogger =
  | {
      query?: boolean;
      info?: boolean;
      warn?: boolean;
      error?: boolean;
    }
  | PrismaLoggerType[];

export type PrismaRepoConfig = {
  repositoryPath?: string; // default: './src/repository'
  extendExpress?: boolean; // default: false
  overwrite?: boolean | PrismaRepoOverwrite; // default: false
  typesPath?: string; // default: './src/types'
  prismaLogger?: boolean | PrismaLogger; // default: false
};
