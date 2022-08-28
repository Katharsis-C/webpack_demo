import { PATH } from '../common';

export const esbuildLoader = {
    test: /\.tsx$/,
    exclude: PATH.resolve(__dirname, 'node_modules'),
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
