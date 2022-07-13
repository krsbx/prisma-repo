import chalk from 'chalk';

const logger = {
  error: (...args: unknown[]) => {
    console.log(chalk.red(...args));
  },
  warn: (...args: unknown[]) => {
    console.log(chalk.yellow(...args));
  },
  info: (...args: unknown[]) => {
    console.log(chalk.cyan(...args));
  },
  success: (...args: unknown[]) => {
    console.log(chalk.green(...args));
  },
};

export default logger;
