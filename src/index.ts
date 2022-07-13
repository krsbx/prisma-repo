import fs from 'fs/promises';
import { generateModelStructures, getAllModelNames, getModelsTypes } from './utils/common';

const main = async () => {
  const prismaTypeDefinitions = await fs.readFile(
    './node_modules/.prisma/client/index.d.ts',
    'utf8'
  );

  const modelNames = getAllModelNames(prismaTypeDefinitions);

  const modelStructure = generateModelStructures(modelNames);

  const modelTypes = getModelsTypes(prismaTypeDefinitions, modelNames);

  console.log(modelTypes);
};

main();
