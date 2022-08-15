import {
  IMPORT_LIBRARY,
  INSTANCE_NAME,
  INTERFACE_NAME,
  PRISMA_TYPES,
  BASE_REPOSITORY_TYPE,
  TYPES_NAMES,
  BASE_REPOSITORY_MODEL_NAME,
  BASE_REPOSITORY_BASE_TYPE,
  REPOSITORY_TYPE,
} from '../utils/constants';

const baseRepository = `/* eslint-disable @typescript-eslint/ban-ts-comment */
// Keep in mind that this file is automatically generated.
// You can change the content of this file, but it will be overwritten.

${IMPORT_LIBRARY.LODASH}
${IMPORT_LIBRARY.PRISMA}
import { ${INSTANCE_NAME.MODELS}, ${TYPES_NAMES.MODEL_NAME}, ${TYPES_NAMES.MODEL_STRUCTURE}, ${TYPES_NAMES.MODEL_SCALAR_FIELDS}, ${INTERFACE_NAME.ANY_RECORD}, ${INTERFACE_NAME.BASE_OPTION}, ${INTERFACE_NAME.FIND}, ${INTERFACE_NAME.COUNT_ARGS}, ${INTERFACE_NAME.AGGREGATE}, ${TYPES_NAMES.MODEL_TYPES} } from './models';

/**
 * @param model - The model name
 */

export class BaseRepository<${BASE_REPOSITORY_BASE_TYPE.CONSTRUCTOR}> {
  constructor(protected modelName: ${TYPES_NAMES.MODEL_NAME}) {
    ${BASE_REPOSITORY_MODEL_NAME} = modelName;
  }

  // eslint-disable-next-line class-methods-use-this
  private extractCondition(conditions: ${REPOSITORY_TYPE.CURSOR} | ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS}) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    return dbCond;
  }

  public async findAll(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    filterQueryParams: ${INTERFACE_NAME.ANY_RECORD} = {},
    query: ${INTERFACE_NAME.ANY_RECORD} = {},
    option: ${BASE_REPOSITORY_TYPE.FIND_OPTION} = {}
  ) {
    const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
    const offset = query.page && query.page > 0 ? limit * (query.page - 1) : 0;
    const otherOptions = _.omit(query, ['limit', 'offset', 'page']);

    const where = { ...this.extractCondition(conditions), ...filterQueryParams, ...otherOptions };

    return {
      // @ts-ignore
      rows: (await this.model.findMany({
        where,
        ...option,
        skip: offset,
        ...(limit > 0 && { take: limit }),
      })) as ${REPOSITORY_TYPE.MODEL}[],
      /* @ts-ignore */
      count: await this.count(where),
    };
  }

  public async findOne(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    option: ${BASE_REPOSITORY_TYPE.FIND_OPTION} = {}
  ) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.findFirst({ where, ...option }) as Promise<${REPOSITORY_TYPE.MODEL}>;
  }

  public async findUnique(
    conditions: ${REPOSITORY_TYPE.CURSOR} | number | string,
    option: ${BASE_REPOSITORY_TYPE.CREATE_UPDATE_OPTION} = {}
  ) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.findUnique({ where, ...option }) as Promise<${REPOSITORY_TYPE.MODEL}>;
  }

  public async create(data: ${REPOSITORY_TYPE.CREATE}, option: ${BASE_REPOSITORY_TYPE.CREATE_UPDATE_OPTION} = {}) {
    // @ts-ignore
    return this.model.create({ data, ...option }) as Promise<${REPOSITORY_TYPE.MODEL}>;
  }

  public async update(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    data: ${BASE_REPOSITORY_TYPE.UPDATE_CREATE_PAYLOAD},
    option: ${BASE_REPOSITORY_TYPE.CREATE_UPDATE_OPTION} = {}
  ) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.update({ data, where, ...option }) as Promise<${REPOSITORY_TYPE.MODEL}>;
  }

  public async delete(conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS}) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.deleteMany({ where }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }

  public async deleteOne(conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS}) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.delete({ where }) as Promise<${REPOSITORY_TYPE.MODEL}>;
  }

  public async updateOrCreate(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    data: ${REPOSITORY_TYPE.CREATE},
    option: ${BASE_REPOSITORY_TYPE.FIND_OPTION} = {}
  ) {
    const obj = await this.findOne(conditions, option);

    if (obj) return this.update(conditions, data, option);

    return this.create(data);
  }

  public async bulkCreate(data: ${BASE_REPOSITORY_TYPE.ENUMERABLE_CREATE}, skipDuplicates = true) {
    // @ts-ignore
    return this.model.createMany({ data, skipDuplicates }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }

  public async bulkUpdate(where: ${REPOSITORY_TYPE.WHERE}, data: ${BASE_REPOSITORY_TYPE.ENUMERABLE_UPDATE}) {
    // @ts-ignore
    return this.model.updateMany({ data, where }) as Promise<${PRISMA_TYPES.BATCH_PAYLOAD}>;
  }

  public async count(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    option: ${BASE_REPOSITORY_TYPE.COUNT_OPTION} = {}
  ) {
    const where = this.extractCondition(conditions);

    // @ts-ignore
    return this.model.count({ where, ...option }) as Promise<number>;
  }

  public aggregate(
    conditions: ${BASE_REPOSITORY_TYPE.QUERY_CONDITIONS},
    aggregator: ${BASE_REPOSITORY_TYPE.AGGREGATE},
    option: ${BASE_REPOSITORY_TYPE.AGGREGATE_OPTION} = {}
  ) {
    // @ts-ignore
    const aggregate = this.model.aggregate as Delegate['aggregate'];
    const where = this.extractCondition(conditions);

    if (_.isEmpty(aggregator)) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      aggregator._count = true;
    }

    // @ts-ignore
    return aggregate({ where, ...aggregator, ...option }) as ReturnType<typeof aggregate>;
  }

  public get model(): Delegate {
    // @ts-ignore
    return ${INSTANCE_NAME.MODELS}[${BASE_REPOSITORY_MODEL_NAME}];
  }
}

const factory = <${BASE_REPOSITORY_TYPE.EXTEND_MODEL_NAME}>(model: T) =>
  new BaseRepository<
    ${BASE_REPOSITORY_BASE_TYPE.WHERE},
    ${BASE_REPOSITORY_BASE_TYPE.SELECT},
    ${BASE_REPOSITORY_BASE_TYPE.INCLUDE},
    ${BASE_REPOSITORY_BASE_TYPE.CREATE},
    ${BASE_REPOSITORY_BASE_TYPE.UPDATE},
    ${BASE_REPOSITORY_BASE_TYPE.CURSOR},
    ${BASE_REPOSITORY_BASE_TYPE.ORDER},
    ${BASE_REPOSITORY_BASE_TYPE.DELEGATE},
    ${BASE_REPOSITORY_BASE_TYPE.SCALAR},
    ${BASE_REPOSITORY_TYPE.MODEL_STRUCTURE}
  >(model);

export default factory;
`;

export default baseRepository;
