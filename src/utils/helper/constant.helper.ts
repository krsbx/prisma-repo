import _ from 'lodash';

export const getModelNameConstant = (modelNames: string[]) => {
  return _.map(modelNames, (value) => ({
    key: _.constantCase(value),
    value: `'${_.camelCase(value)}'`,
  }));
};
