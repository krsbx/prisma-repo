import fs from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';

export const execAsync = promisify(exec);

export const readFile = (filePath: string) => fs.readFile(filePath, 'utf8');
