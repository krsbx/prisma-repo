import { IMPORT_LIBRARY, MODELS_CONSTANTS_NAMES } from '../utils/constants';

export const importer = {
  lodash: IMPORT_LIBRARY.LODASH,
  prisma: IMPORT_LIBRARY.PRISMA,
  factory: `import factory from './baseRepository';`,
  types: `import { ${MODELS_CONSTANTS_NAMES} } from './models';`,
} as const;
