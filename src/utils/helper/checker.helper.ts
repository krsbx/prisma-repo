import _ from 'lodash';

export const checkModelExist = (prisma: string, modelName: string) =>
  prisma
    .split('\n')
    .some((line) => line.match(new RegExp(`export type (Aggregate${modelName}) = `)));

export const checkShouldOverwrite = (
  overwrite: PR.PrismaRepoConfig['overwrite'],
  types: keyof PR.PrismaRepoOverwrite
) => {
  if (_.isNil(overwrite)) return false;

  if (_.isBoolean(overwrite)) return overwrite;

  return overwrite[types];
};
