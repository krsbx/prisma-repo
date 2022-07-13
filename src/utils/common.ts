import _ from 'lodash';
import { DEFAULT_MODEL_TYPES, MOST_COMMON_TYPE, TYPES_NAMES, TYPE_SUFFIX } from './constants';
import { ModelTypes, TypeSuffix } from './interface';

export const getAllModelNames = (typeDefinitions: string) => {
  const typeDefinitionsArray = typeDefinitions.split('\n');

  const modelNames = typeDefinitionsArray
    .filter((line) => line.match(/export type (Aggregate.*?) = {/))
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

  const modelStructureStrings = `export type ${TYPES_NAMES.MODEL_STRUCTURE} = ${JSON.stringify(
    modelStructure,
    null,
    2
  )}`;

  return modelStructureStrings;
};

export const generateModelScalarFields = () =>
  `export type ${TYPES_NAMES.MODEL_SCALAR_FIELDS}<T extends ${TYPES_NAMES.MODEL_NAME}> = ${TYPES_NAMES.MODEL_STRUCTURE}[T]`;

export const extractModelTypes = <T extends string>(
  line: string,
  modelName: T,
  suffix: TypeSuffix,
  modelTypes: ModelTypes<T>
) => {
  if (line.match(new RegExp(`export type ${modelName}${suffix}`))) {
    const lineChunks = line.split(' ');

    // eslint-disable-next-line no-param-reassign
    modelTypes[suffix] = lineChunks[lineChunks.length - 3] as ModelTypes<
      typeof modelName
    >[typeof suffix];
  }
};

export const getModelTypes = (typeDefinitions: string, typeName: string) => {
  const typeDefinitionsArray = typeDefinitions.split('\n');
  const modelType: ModelTypes<typeof typeName> = DEFAULT_MODEL_TYPES;

  _.forEach(typeDefinitionsArray, (line) => {
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

export const getModelsTypes = (typeDefinitions: string, modelNames: string[]) => {
  const modelsTypes: ModelTypes<string>[] = _.map(modelNames, (modelName) =>
    JSON.parse(getModelTypes(typeDefinitions, modelName))
  );

  return modelsTypes;
};
