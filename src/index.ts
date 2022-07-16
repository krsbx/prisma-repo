#!/usr/bin/env node

import runCli from './cli/index';
import renderTitle from './cli/title';
import { getSettings } from './utils/common';

const main = async () => {
  renderTitle();

  const settings = await getSettings();

  await runCli(settings);
};

main();
