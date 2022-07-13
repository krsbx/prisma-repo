import {
  EXPORT_TYPE,
  EXPORT_INTERFACE,
  INTERFACE_NAME,
  EXPORT_CONST,
  INSTANCE_NAME,
  IMPORT_LIBRARY,
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
  baseOption: `${EXPORT_INTERFACE} ${INTERFACE_NAME.BASE_OPTION}<Include, Select> {
  include?: Include;
  select?: Select;
}`,
  find: `${EXPORT_INTERFACE} ${INTERFACE_NAME.FIND}<Select, Include, Cursor, Order, Distinct> extends ${INTERFACE_NAME.BASE_OPTION}<Include, Select> {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
}`,
} as const;

export const prismaInstance = {
  prisma: `${EXPORT_CONST} ${INSTANCE_NAME.PRISMA} = new PrismaClient();`,
  models: `${EXPORT_CONST} ${INSTANCE_NAME.MODELS} = _.omit(prisma, [
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
