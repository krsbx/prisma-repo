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
