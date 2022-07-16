import {
  IMPORT_LIBRARY,
  INTERFACE_NAME,
  MODELS_CONSTANTS_NAMES,
  TYPES_NAMES,
} from '../utils/constants';

export const importer = {
  lodash: IMPORT_LIBRARY.LODASH,
  prisma: IMPORT_LIBRARY.PRISMA,
  factory: `import factory from './baseRepository';`,
  types: `import { ${INTERFACE_NAME.ANY_RECORD}, ${TYPES_NAMES.MODEL_STRUCTURE}, ${MODELS_CONSTANTS_NAMES} } from './models';`,
} as const;
