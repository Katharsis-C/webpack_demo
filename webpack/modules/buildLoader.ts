import { RuleSetRule } from 'webpack';
import { filePath } from '../common/path';

export const buildLoader: RuleSetRule = {
    test: /\.tsx|.ts$/,
    include: [filePath.src],
    use: [
        {
            loader: 'esbuild-loader',
            options: {
                loader: 'tsx',
                target: 'es2015',
            },
        },
    ],
};
