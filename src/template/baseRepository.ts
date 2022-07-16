import {
  IMPORT_LIBRARY,
  INSTANCE_NAME,
  INTERFACE_NAME,
  PRISMA_TYPES,
  BASE_REPOSITORY_TYPE,
  TYPES_NAMES,
  BASE_REPOSITORY_MODEL_NAME,
} from '../utils/constants';

const baseRepository = `/* eslint-disable @typescript-eslint/ban-ts-comment */
// Keep in mind that this file is automatically generated.
// You can change the content of this file, but it will be overwritten.

${IMPORT_LIBRARY.LODASH}
${IMPORT_LIBRARY.PRISMA}
import { ${INSTANCE_NAME.MODELS}, ${TYPES_NAMES.MODEL_NAME}, ${TYPES_NAMES.MODEL_STRUCTURE}, ${TYPES_NAMES.MODEL_SCALAR_FIELDS}, ${INTERFACE_NAME.ANY_RECORD}, ${INTERFACE_NAME.FIND}, ${INTERFACE_NAME.BASE_OPTION}, ${TYPES_NAMES.MODEL_TYPES} } from './models';

/**
 * @param model - The model name
 */

export class BaseRepository {
  constructor(protected model: ${TYPES_NAMES.MODEL_NAME}) {
    ${BASE_REPOSITORY_MODEL_NAME} = model;
  }

  async findAll<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(
    conditions: ${BASE_REPOSITORY_TYPE.WHERE},
    filterQueryParams: ${INTERFACE_NAME.ANY_RECORD} = {},
    options: ${INTERFACE_NAME.ANY_RECORD} = {},
    include: ${BASE_REPOSITORY_TYPE.INCLUDE} = {} as ${BASE_REPOSITORY_TYPE.INCLUDE}
  ) {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset', 'page']);

    const where = { ...conditions, ...filterQueryParams, ...otherOptions };

    return {
      // @ts-ignore
      rows: (await ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].findMany({
        where,
        ...(!_.isEmpty(include) && { include }),
        skip: offset,
        ...(limit > 0 && { take: limit }),
      })) as ${BASE_REPOSITORY_TYPE.MODEL_STRUCTURE}[],
      // eslint-disable-next-line no-underscore-dangle
      count: /* @ts-ignore */ (
        await ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].aggregate({
          where,
          _count: true,
        })
      )._count as number,
    };
  }

  async findOne<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    option: ${BASE_REPOSITORY_TYPE.FIND_OPTION} = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].findFirst({
      where: dbCond,
      ...option,
    }) as Promise<${BASE_REPOSITORY_TYPE.MODEL_STRUCTURE}>;
  }

  async create<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(
    data: ${BASE_REPOSITORY_TYPE.CREATE},
    option: ${BASE_REPOSITORY_TYPE.CREATE_UPDATE_OPTION} = {}
  ) {
    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].create({
      data,
      ...option,
    }) as Promise<${BASE_REPOSITORY_TYPE.MODEL_STRUCTURE}>;
  }

  async update<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    data: ${BASE_REPOSITORY_TYPE.UPDATE} | ${BASE_REPOSITORY_TYPE.CREATE},
    option: ${BASE_REPOSITORY_TYPE.CREATE_UPDATE_OPTION} = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].update({
      data,
      where: dbCond,
      ...option,
    }) as Promise<${BASE_REPOSITORY_TYPE.MODEL_STRUCTURE}>;
  }

  async delete<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS}) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].deleteMany({
      where: dbCond,
    }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }

  async updateOrCreate<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    data: ${BASE_REPOSITORY_TYPE.CREATE},
    option: ${BASE_REPOSITORY_TYPE.FIND_OPTION} = {}
  ) {
    const obj = await this.findOne(conditions, option);

    if (obj) return this.update(conditions, data, option);

    return this.create(data);
  }

  async bulkCreate<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(data: ${BASE_REPOSITORY_TYPE.ENUMERABLE_CREATE}, skipDuplicates = true) {
    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].createMany({
      data,
      skipDuplicates,
    }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }

  async bulkUpdate<${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(where: ${BASE_REPOSITORY_TYPE.WHERE}, data: ${BASE_REPOSITORY_TYPE.ENUMERABLE_UPDATE}) {
    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}].updateMany({
      data,
      where,
    }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }
}

const factory = (model: ${TYPES_NAMES.MODEL_NAME}) =>
  new BaseRepository(model);

export default factory;
`;

export default baseRepository;
