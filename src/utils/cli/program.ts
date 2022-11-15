import _ from 'lodash';
import { Command } from 'commander';
import { APP_TITLE, DEFAULT_CLI_RESULTS } from 'utils/constants';
import packageJson from '../../../package.json';

export const createProgram = () => {
  const program = new Command().name(APP_TITLE);

  program
    .description('Use Prisma with repository pattern')
    .argument(
      '[modelname]',
      'Name of the model for the repository to be generated (case sensitive))'
    )
    .option('--repositories', 'Generate all repositories')
    .option(
      '--modelname <modelname>',
      'Name of the model for the repository to be generated (case sensitive))'
    )
    .option('--base-repository', 'Create a base repository', false)
    .option('--model-structures', 'Update model.ts with the generated structures', false)
    .option('--settings <settings>', 'Use specific settings from args', '')
    .version(packageJson.version, '-v, --version', 'Display the current version of CRB')
    .parse(process.argv);

  const cliResults = Object.assign(DEFAULT_CLI_RESULTS, {
    flags: program.opts<PR.CliResults['flags']>(),
  });

  const modelname = program.args[0];

  if (!_.isEmpty(modelname)) cliResults.modelname = modelname;

  return cliResults;
};
