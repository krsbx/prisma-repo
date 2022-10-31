import {
  CLASS_NAME,
  IMPORT_LIBRARY,
  MODELS_CONSTANTS_NAMES,
  PACKAGE_NAME,
} from '../utils/constants';

export const importer = {
  lodash: IMPORT_LIBRARY.LODASH,
  prisma: IMPORT_LIBRARY.PRISMA,
  baseRepository: `import ${CLASS_NAME.BASE_REPOSITORY} from './baseRepository';`,
  types: `import { ${MODELS_CONSTANTS_NAMES} } from './${PACKAGE_NAME}';`,
} as const;
