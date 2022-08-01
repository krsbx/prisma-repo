import _ from 'lodash';
import { toConstantCase } from './common';
import { MODELS_CONSTANTS_NAMES, REPOSITORY_TYPE, TYPES_NAMES } from './constants';
import { ModelTypes } from './interface';

export const repositoryBuilder = <T extends string>(modelName: T) => {
  const repositoryName = _.camelCase(`${modelName}Repository`);

  return `const ${repositoryName} = factory(${MODELS_CONSTANTS_NAMES}.${toConstantCase(
    modelName
  )});`;
};

export const repositoryExtendsBuilder = <T extends string>(modelName: T) => {
  const extendedRepository = `${_.camelCase(modelName)}Repository`;
  const extendRepository = `extend${_.startCase(modelName)}Repository`;

  return `const extend${_.startCase(modelName)}Repository = {};

const repository = _.merge(${extendedRepository}, ${extendRepository});

export default repository;
`;
};

export const getModelPrismaType = (value: string | unknown) => {
  if (value === 'unknown') return 'unknown';

  return value;
};

export const repositoryTypeBuilder = <T extends string>(modelName: T, modelType: ModelTypes<T>) => {
  return `${_.camelCase(modelName)}: {
    ${[REPOSITORY_TYPE.WHERE]}: ${getModelPrismaType(modelType.WhereInput)};
    ${[REPOSITORY_TYPE.SELECT]}: ${getModelPrismaType(modelType.Select)};
    ${[REPOSITORY_TYPE.INCLUDE]}: ${getModelPrismaType(modelType.Include)};
    ${[REPOSITORY_TYPE.CREATE]}: ${getModelPrismaType(modelType.CreateInput)};
    ${[REPOSITORY_TYPE.UPDATE]}: ${getModelPrismaType(modelType.UpdateInput)};
    ${[REPOSITORY_TYPE.CURSOR]}: ${getModelPrismaType(modelType.WhereUniqueInput)};
    ${[REPOSITORY_TYPE.ORDER]}: ${getModelPrismaType(modelType.OrderByWithRelationInput)};
    ${[REPOSITORY_TYPE.DELEGATE]}: ${getModelPrismaType(modelType.Delegate)}<${
    TYPES_NAMES.MODEL_DELEGATE
  }>;
  };`;
};

export const expressTypesBuilder = (modelsName: string[]) => {
  const expressTypes = `export {};

declare global {
  namespace Express {
    import type { ${modelsName.join(', ')} } from '@prisma/client';

    interface Request {
${_.map(modelsName, (modelName) => {
  const key = _.camelCase(modelName);

  let types = '';

  types += `      ${key}?: ${modelName};\n`;
  types += `      ${key}s?: ${modelName}[] | { rows: ${modelName}[]; count: number };`;

  return types;
}).join('\n')}
    }
  }
}
`;

  return expressTypes;
};
