import _ from 'lodash';
import { ModelTypes } from './interface';

export const repositoryBuilder = <T extends string>(modelName: T, modelTypes: ModelTypes<T>) => {
  const repositoryName = _.camelCase(`${modelName}Repository`);

  return `const ${repositoryName} = factory<
  ${_.map(
    modelTypes,
    (type, name) =>
      `${
        type === 'unknown'
          ? `${type}, // Change this to \`Prisma.${modelName}${name}\` if the types are available`
          : `Prisma.${type}`
      }`
  ).join(',\n  ')}
>('${_.camelCase(modelName)}');`;
};

export const repositoryExtendsBuilder = <T extends string>(modelName: T) => {
  const extendedRepository = `${_.camelCase(modelName)}Repository`;
  const extendRepository = `extend${_.startCase(modelName)}Repository`;

  return `const extend${_.startCase(modelName)}Repository = {};

const repository = _.merge(${extendedRepository}, ${extendRepository});

export default repository;
`;
};
