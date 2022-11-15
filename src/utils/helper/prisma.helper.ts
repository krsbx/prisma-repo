import _ from 'lodash';
import { PRISMA_LOGGER } from 'utils/constants';

const convertToString = (value: PR.PrismaLoggerType[]) =>
  `[${_(value)
    .map((type) => `'${type}'`)
    .join(', ')}]`;

export const getPrismaLogger = (logger: PR.PrismaRepoConfig['prismaLogger']) => {
  if (_.isBoolean(logger)) {
    if (logger) return convertToString(_.values(PRISMA_LOGGER));

    return '[]';
  }

  if (_.isArray(logger)) return convertToString(logger);

  const loggerSettings = _.reduce(
    logger,
    (curr, value, key) => {
      if (value) {
        curr.push(PRISMA_LOGGER[key as keyof typeof PRISMA_LOGGER]);
      }

      return curr;
    },
    [] as PR.PrismaLoggerType[]
  );

  return convertToString(loggerSettings);
};
