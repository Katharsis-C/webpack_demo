import { join, resolve } from 'path';

export const ROOT_PATH = process.cwd();

export const filePath = {
    root: ROOT_PATH,
    nodeModule: resolve(__dirname, '../../node_modules'),
    dist: join(ROOT_PATH, './dist'),
    src: join(ROOT_PATH, './src'),
};
