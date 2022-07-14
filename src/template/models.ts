import {
  EXPORT_TYPE,
  EXPORT_INTERFACE,
  INTERFACE_NAME,
  EXPORT_CONST,
  INSTANCE_NAME,
  IMPORT_LIBRARY,
  PRISMA_TYPES,
  REPOSITORY_TYPE,
} from '../utils/constants';

export const importer = {
  lodash: `/* eslint-disable @typescript-eslint/ban-ts-comment */
${IMPORT_LIBRARY.LODASH}`,
  start: 'import { PrismaClient, Prisma,',
  // Import the generated types from the generated file
  // While creating the template
  end: "} from '@prisma/client';",
} as const;

export const interfaces = {
  anyRecord: `// eslint-disable-next-line @typescript-eslint/no-explicit-any
${EXPORT_TYPE} ${INTERFACE_NAME.ANY_RECORD} = Record<string, any>;`,
  baseOption: `${EXPORT_INTERFACE} ${INTERFACE_NAME.BASE_OPTION}<${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.SELECT}> {
  include?: ${REPOSITORY_TYPE.INCLUDE};
  select?: ${REPOSITORY_TYPE.SELECT};
}`,
  find: `${EXPORT_INTERFACE} ${INTERFACE_NAME.FIND}<${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}>
  extends ${INTERFACE_NAME.BASE_OPTION}<${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.SELECT}> {
  cursor?: ${REPOSITORY_TYPE.CURSOR};
  take?: number;
  skip?: number;
  orderBy?: ${PRISMA_TYPES.ENUMERABLE}<${REPOSITORY_TYPE.ORDER}>;
  distinct?: ${REPOSITORY_TYPE.DISTINCT};
}`,
} as const;

export const prismaInstance = {
  prisma: `${EXPORT_CONST} ${INSTANCE_NAME.PRISMA} = new PrismaClient();`,
  models: `${EXPORT_CONST} ${INSTANCE_NAME.MODELS} = _.omit(${INSTANCE_NAME.PRISMA}, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);`,
} as const;
