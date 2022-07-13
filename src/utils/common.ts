import _ from 'lodash';
import {
  DEFAULT_MODEL_TYPES,
  EXPORT_CONST,
  EXPORT_TYPE,
  MODELS_CONSTANTS_NAMES,
  MOST_COMMON_TYPE,
  TYPES_NAMES,
  TYPE_SUFFIX,
} from './constants';
import { ModelTypes, TypeSuffix } from './interface';

export const getAllModelNames = (prisma: string) => {
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
  const modelStructure = _.reduce(
    modelNames,
    (curr, value) => ({
      ...curr,
      [_.camelCase(value)]: value,
    }),
    {}
  );

  const modelStructureStrings = `// eslint-disable-next-line @typescript-eslint/ban-types
${EXPORT_TYPE} ${TYPES_NAMES.MODEL_STRUCTURE} = {
  ${_.map(modelStructure, (value, key) => `${key}: ${value}`).join(';\n  ')};
};`;

  return modelStructureStrings;
};

export const generateModelName = () =>
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_NAME} = keyof ${TYPES_NAMES.MODEL_STRUCTURE};`;

export const generateModelScalarFields = () =>
  `${EXPORT_TYPE} ${TYPES_NAMES.MODEL_SCALAR_FIELDS}<T extends keyof ${TYPES_NAMES.MODEL_STRUCTURE}> = ${TYPES_NAMES.MODEL_STRUCTURE}[T];`;

export const extractModelTypes = <T extends string>(
  line: string,
  modelName: T,
  suffix: TypeSuffix,
  modelTypes: ModelTypes<T>
) => {
  if (line.match(new RegExp(`${EXPORT_TYPE} ${modelName}${suffix}`))) {
    const lineChunks = line.split(' ');

    // eslint-disable-next-line no-param-reassign
    modelTypes[suffix] = lineChunks[lineChunks.length - 3] as ModelTypes<
      typeof modelName
    >[typeof suffix];
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

  // Stringyfy the model types
  // We need to stringify the model types since for somehow
  // it race with getModelsType when using map/foreach
  return JSON.stringify(modelType, null, 2);
};

export const getModelsTypes = (prisma: string, modelNames: string[]) => {
  const modelsTypes: ModelTypes<string>[] = _.map(modelNames, (modelName) =>
    JSON.parse(getModelTypes(prisma, modelName))
  );

  return modelsTypes;
};

export const toConstantCase = (value: string) => _.upperCase(value).replace(/ /g, '_');

export const generateModelNameConstants = (modelNames: string[]) => {
  const modelNameConstants = _.reduce(
    modelNames,
    (curr, value) => ({
      ...curr,
      [toConstantCase(value)]: _.camelCase(value),
    }),
    {}
  );

  const modelNameConstantsStrings = `${EXPORT_CONST} ${MODELS_CONSTANTS_NAMES} = ${JSON.stringify(
    modelNameConstants,
    null,
    2
  )} as const`;

  return modelNameConstantsStrings;
};

export const isModelExists = (prisma: string, modelName: string) => {
  const prismaArray = prisma.split('\n');

  return prismaArray.some((line) =>
    line.match(new RegExp(`${EXPORT_TYPE} (${MOST_COMMON_TYPE}${modelName}) =`))
  );
};
