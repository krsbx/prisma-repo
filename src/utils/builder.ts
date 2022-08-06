import _ from 'lodash';
import { toConstantCase } from './common';
import { MODELS_CONSTANTS_NAMES, REPOSITORY_TYPE, TYPES_NAMES } from './constants';
import { ExtendExpress, ModelTypes } from './interface';

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

export const expressTypesBuilder = (modelsName: string[], settings?: boolean | ExtendExpress) => {
  if (!settings) return '';

  const modelNames = _.isBoolean(settings)
    ? modelsName
    : modelsName
        .filter((modelName) => (settings.include ? settings.include.includes(modelName) : true))
        .filter((modelName) => (settings.exclude ? !settings.exclude.includes(modelName) : true));

  const expressTypes = `import type { ${modelNames.join(', ')} } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
${_.map(modelNames, (modelName) => {
  const key = _.camelCase(modelName);

  let types = '';

  types += `      ${key}: ${modelName} | undefined;\n`;
  types += `      ${key}s: { rows: ${modelName}[]; count: number } | undefined;`;

  return types;
}).join('\n')}
    }
  }
}
`;

  return expressTypes;
};
