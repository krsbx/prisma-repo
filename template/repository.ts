import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './prisma-repo';

class {{ repository }} extends BaseRepository({{ repositoryName }}) {
}

export default {{ repository }}
