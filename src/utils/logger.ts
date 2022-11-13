import ora from 'ora';
import chalk from 'chalk';

export const oras = ora;
export const chalks = chalk;

export const logger = {
  error: (...args: unknown[]) => {
    console.log(chalks.red(...args));
  },
  warn: (...args: unknown[]) => {
    console.log(chalks.yellow(...args));
  },
  info: (...args: unknown[]) => {
    console.log(chalks.cyan(...args));
  },
  success: (...args: unknown[]) => {
    console.log(chalks.green(...args));
  },
};
