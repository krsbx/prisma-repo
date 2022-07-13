import { IMPORT_LIBRARY, INTERFACE_NAME, TYPES_NAMES } from '../utils/constants';

export const importer = {
  lodash: IMPORT_LIBRARY.LODASH,
  prisma: IMPORT_LIBRARY.PRISMA,
  factory: `import factory from './baseRepository';`,
  types: `import { ${INTERFACE_NAME.ANY_RECORD}, ${TYPES_NAMES.MODEL_STRUCTURE} } from './models';`,
} as const;
