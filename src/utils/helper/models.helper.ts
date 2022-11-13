import _ from 'lodash';
import { DEFAULT_MODEL_TYPES, TYPE_SUFFIX } from 'utils/constants';
import { assignModelType } from './assign.helper';

export const getModelTypes = (prisma: string, modelName: string) => {
  const modelType: PR.ModelTypes<typeof modelName> = DEFAULT_MODEL_TYPES;

  prisma.split('\n').forEach((line) => {
    assignModelType(line, modelName, TYPE_SUFFIX.WHERE_INPUT, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.SELECT, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.INCLUDE, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.CREATE_INPUT, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.UPDATE_INPUT, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.WHERE_UNIQUE_INPUT, modelType);
    assignModelType(line, modelName, TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT, modelType);
  });

  modelType.Delegate = `Prisma.${modelName}${TYPE_SUFFIX.DELEGATE}`;

  return modelType;
};

export const getAllModelTypes = (prisma: string, modelNames: string[]) => {
  const modelsTypes: { key: string; value: PR.ModelTypes<string> }[] = _.map(
    modelNames,
    (modelName) => ({
      key: _.camelCase(modelName),
      value: getModelTypes(prisma, modelName),
    })
  );

  return modelsTypes;
};

export const getAllModelName = (prisma: string) => {
  const prismaArray = prisma.split('\n');

  const modelNames = prismaArray
    .filter((line) => line.match(/export type (Aggregate.*?) =/))
    .map((line) => {
      const lineChunks = line.split(' ');

      return lineChunks[lineChunks.length - 3].replace('Aggregate', '');
    });

  return modelNames;
};

export const getModelStructures = (modelNames: string[]) => {
  if (_.isEmpty(modelNames)) return [];

  return _.map(modelNames, (value) => ({
    key: _.camelCase(value),
    value,
  }));
};
