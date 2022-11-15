#!/usr/bin/env node

import _ from 'lodash';
import { renderTitle } from 'utils/cli/helper';
import { runCli } from 'cli';

const main = () => {
  renderTitle();
  runCli();
};

_.mixin({
  constantCase: (value: string) => _.upperCase(value).replace(/ /g, '_'),
});

main();
