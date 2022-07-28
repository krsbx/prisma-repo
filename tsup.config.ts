// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

const config = defineConfig({
  noExternal: ['tsup'],
});

export default config;
