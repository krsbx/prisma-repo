import { CLASS_NAME, IMPORT_LIBRARY, MODELS_CONSTANTS_NAMES } from '../utils/constants';

export const importer = {
  lodash: IMPORT_LIBRARY.LODASH,
  prisma: IMPORT_LIBRARY.PRISMA,
  baseRepository: `import ${CLASS_NAME.BASE_REPOSITORY} from './baseRepository';`,
  types: `import { ${MODELS_CONSTANTS_NAMES} } from './models';`,
} as const;
