import {
  EXPORT_TYPE,
  INTERFACE_NAME,
  EXPORT_CONST,
  INSTANCE_NAME,
  IMPORT_LIBRARY,
  PRISMA_TYPES,
  REPOSITORY_TYPE,
} from '../utils/constants';

export const importer = {
  lodash: `${IMPORT_LIBRARY.LODASH}`,
  start: 'import { PrismaClient, Prisma,',
  // Import the generated types from the generated file
  // While creating the template
  end: "} from '@prisma/client';",
} as const;

export const interfaces = {
  anyRecord: `// eslint-disable-next-line @typescript-eslint/no-explicit-any
${EXPORT_TYPE} ${INTERFACE_NAME.ANY_RECORD} = Record<string, any>;`,
  baseOption: `${EXPORT_TYPE} ${INTERFACE_NAME.BASE_OPTION}<${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.SELECT}> = {
  include?: ${REPOSITORY_TYPE.INCLUDE};
  select?: ${REPOSITORY_TYPE.SELECT};
};`,
  find: `${EXPORT_TYPE} ${INTERFACE_NAME.FIND}<${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}> = ${INTERFACE_NAME.BASE_OPTION}<${REPOSITORY_TYPE.INCLUDE}, ${REPOSITORY_TYPE.SELECT}> & {
  cursor?: ${REPOSITORY_TYPE.CURSOR};
  take?: number;
  skip?: number;
  orderBy?: ${PRISMA_TYPES.ENUMERABLE}<${REPOSITORY_TYPE.ORDER}>;
  distinct?: ${REPOSITORY_TYPE.DISTINCT};
};`,
  countArgs: `${EXPORT_TYPE} ${INTERFACE_NAME.COUNT_ARGS}<${REPOSITORY_TYPE.SELECT}, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}> = Omit<
  ${INTERFACE_NAME.FIND}<${REPOSITORY_TYPE.SELECT}, never, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}>,
  'include'
>;`,
  aggregate: `${EXPORT_TYPE} ${INTERFACE_NAME.AGGREGATE}<${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}> = Omit<
  ${INTERFACE_NAME.COUNT_ARGS}<never, ${REPOSITORY_TYPE.CURSOR}, ${REPOSITORY_TYPE.ORDER}, ${REPOSITORY_TYPE.DISTINCT}>,
  'select' | 'distinct'
>;`,
  aggregateArgs: `${EXPORT_TYPE} ${INTERFACE_NAME.AGGREGATE_ARGS}<${REPOSITORY_TYPE.DELEGATE}> = {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  _avg?: ${REPOSITORY_TYPE.DELEGATE}['_avg'];
  // @ts-ignore
  _count?: ${REPOSITORY_TYPE.DELEGATE}['_count'];
  // @ts-ignore
  _max?: ${REPOSITORY_TYPE.DELEGATE}['_max'];
  // @ts-ignore
  _min?: ${REPOSITORY_TYPE.DELEGATE}['_min'];
  // @ts-ignore
  _sum?: ${REPOSITORY_TYPE.DELEGATE}['_sum'];
  /* eslint-enable @typescript-eslint/ban-ts-comment */
};`,
} as const;

export const prismaInstance = {
  prisma: (logger: string) =>
    `${EXPORT_CONST} ${INSTANCE_NAME.PRISMA} = new PrismaClient({
  log: ${logger},
});`,
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
