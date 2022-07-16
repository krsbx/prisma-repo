import _ from 'lodash';
import { EXPORT_TYPE, MOST_COMMON_TYPE } from './constants';

export const toConstantCase = (value: string) => _.upperCase(value).replace(/ /g, '_');

export const isModelExists = (prisma: string, modelName: string) => {
  const prismaArray = prisma.split('\n');

  return prismaArray.some((line) =>
    line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}${modelName}) =`))
  );
};
