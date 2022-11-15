import { TYPE_SUFFIX } from 'utils/constants';

export const assignModelType = <
  ModelName extends string,
  ModelType extends PR.ModelTypes<ModelName>,
  Suffix extends PR.TypeSuffix,
  Assign extends ModelType[Suffix]
>(
  line: string,
  modelName: ModelName,
  suffix: Suffix,
  modelTypes: ModelType
) => {
  if (!line.match(new RegExp(`export type ${modelName}${suffix}`))) return 'unknown';

  switch (suffix) {
    case TYPE_SUFFIX.CREATE_INPUT:
    case TYPE_SUFFIX.UPDATE_INPUT:
      modelTypes[suffix] =
        `Prisma.${modelName}${suffix} | Prisma.${modelName}Unchecked${suffix}` as Assign;
      break;

    default:
      modelTypes[suffix] = `Prisma.${modelName}${suffix}` as Assign;
      break;
  }

  return modelTypes[suffix];
};
