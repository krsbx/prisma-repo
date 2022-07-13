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
};

export type TypeSuffix = typeof TYPE_SUFFIX[keyof typeof TYPE_SUFFIX];
