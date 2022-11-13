import _ from 'lodash';

export const expressTypesBuilder = (
  modelsName: string[],
  settings?: boolean | PR.ExtendExpress
) => {
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
