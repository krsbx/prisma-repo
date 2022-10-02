import _ from 'lodash';
import { repositoryTypeBuilder } from './builder';
import { toConstantCase } from './common';
import {
  DEFAULT_MODEL_TYPES,
  EXPORT_CONST,
  EXPORT_TYPE,
  MODELS_CONSTANTS_NAMES,
  MOST_COMMON_TYPE,
  PRISMA_TYPES,
  TYPES_NAMES,
  TYPE_SUFFIX,
} from './constants';
import { ModelTypes, TypeSuffix } from './interface';

export const getAllModelName = (prisma: string) => {
  const prismaArray = prisma.split('\n');

  const modelNames = prismaArray
    .filter((line) => line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}.*?) =`)))
    .map((line) => {
      const lineChunks = line.split(' ');

      return lineChunks[lineChunks.length - 3].replace(MOST_COMMON_TYPE, '');
    });

  return modelNames;
};

export const generateModelStructures = (modelNames: string[]) => {
  const modelStructures = _.reduce(
    modelNames,
    (curr, value) => ({
      ...curr,
      [_.camelCase(value)]: value,
    }),
    {}
  );

  const modelStructuresStrings = `// eslint-disable-next-line @typescript-eslint/ban-types
${EXPORT_TYPE} ${TYPES_NAMES.MODEL_STRUCTURE} = {
  ${_.map(modelStructures, (value, key) => `${key}: ${value}`).join(';\n  ')};
};`;

  return modelStructuresStrings;
};

export const extractModelTypes = <T extends string>(
  line: string,
  modelName: T,
  suffix: TypeSuffix,
  modelTypes: ModelTypes<T>
) => {
  if (line.match(new RegExp(`${EXPORT_TYPE} ${modelName}${suffix}`))) {
    switch (suffix) {
      case TYPE_SUFFIX.CREATE_INPUT:
      case TYPE_SUFFIX.UPDATE_INPUT:
        // eslint-disable-next-line no-param-reassign
        modelTypes[suffix] =
          `${PRISMA_TYPES.PRISMA}.${modelName}${suffix} | ${PRISMA_TYPES.PRISMA}.${modelName}Unchecked${suffix}` as ModelTypes<
            typeof modelName
          >[typeof suffix];
        break;

      default:
        // eslint-disable-next-line no-param-reassign
        modelTypes[suffix] = `${PRISMA_TYPES.PRISMA}.${modelName}${suffix}` as ModelTypes<
          typeof modelName
        >[typeof suffix];
        break;
    }
  }
};

export const getModelTypes = (prisma: string, typeName: string) => {
  const prismaArray = prisma.split('\n');
  const modelType: ModelTypes<typeof typeName> = DEFAULT_MODEL_TYPES;

  _.forEach(prismaArray, (line) => {
    extractModelTypes(line, typeName, TYPE_SUFFIX.WHERE_INPUT, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.SELECT, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.INCLUDE, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.CREATE_INPUT, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.UPDATE_INPUT, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.WHERE_UNIQUE_INPUT, modelType);
    extractModelTypes(line, typeName, TYPE_SUFFIX.ORDER_BY_WITH_RELATION_INPUT, modelType);
  });

  modelType.Delegate = `${PRISMA_TYPES.PRISMA}.${typeName}${TYPE_SUFFIX.DELEGATE}`;

  // Stringyfy the model types
  // We need to stringify the model types since for somehow
  // it race with getModelsType when using map/foreach
  return JSON.stringify(modelType, null, 2);
};

export const getAllModelTypes = (prisma: string, modelNames: string[]) => {
  const modelsTypes: ModelTypes<string>[] = _.map(modelNames, (modelName) =>
    JSON.parse(getModelTypes(prisma, modelName))
  );

  return modelsTypes;
};

export const generateModelNameConstants = (modelNames: string[]) => {
  const modelNameConstants = _.reduce(
    modelNames,
    (curr, value) => ({
      ...curr,
      [toConstantCase(value)]: _.camelCase(value),
    }),
    {}
  );

  const modelNameConstantsStrings = `${EXPORT_CONST} ${MODELS_CONSTANTS_NAMES} = {
  ${_.map(modelNameConstants, (value, key) => `${key}: '${value}'`).join(',\n  ')},
} as const;`;

  return modelNameConstantsStrings;
};

export const getAllModelPrismaTypes = (modelNames: string[], modelsTypes: ModelTypes<string>[]) => {
  return _.reduce(
    modelNames,
    (curr, modelName, id) => ({
      ...curr,
      [modelName]: repositoryTypeBuilder(modelName, modelsTypes[id]),
    }),
    {}
  );
};

export const generateModelsPrismaTypes = (
  modelNames: string[],
  modelsTypes: ModelTypes<string>[]
) => {
  const modelsPrismaTypes = getAllModelPrismaTypes(modelNames, modelsTypes);

  const modelsPrismaTypesStrings = `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_TYPES} = {
  ${_.join(_.values(modelsPrismaTypes), '\n  ')}
};`;

  return modelsPrismaTypesStrings;
};
