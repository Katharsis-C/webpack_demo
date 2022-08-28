const PATH = require('path');
const MiniCss = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const initHtml = ({ fileName, title, chunks }) => {
    return new HTMLPlugin({
        title,
        filename: `views/${fileName}`,
        template: './index.html',
        minify: true,
        inject: true,
        chunks,
    });
};

module.exports = {
    entry: {
        index: './src/pages/index/index',
        login: './src/pages/login/index',
    },
    output: {
        filename: 'js/[name]_[chunkhash:8].js',
        path: PATH.resolve(__dirname, './dist'),
    },
    devServer: {
        static: PATH.resolve(__dirname),
    },
    context: PATH.resolve(__dirname),
    mode: 'development',
    module: {
        rules: [
            {
                oneOf: [
                    //esbuild setting
                    {
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
                    },
                    //scss setting
                    {
                        test: /\.scss$/,
                        use: [MiniCss.loader, 'css-loader', 'sass-loader'],
                        include: PATH.resolve(__dirname, './src'),
                    },
                ],
            },
        ],
    },
    plugins: [
        // new HTMLPlugin({
        //     title: 'webpack test',
        //     filename: 'index.html',
        //     template: './index.html',
        //     minify: true,
        //     // hash: true
        // }),

        initHtml({
            fileName: 'index.html',
            title: 'index',
            chunks: ['index'],
        }),
        initHtml({
            fileName: 'login.html',
            title: 'login',
            chunks: ['login'],
        }),
        new MiniCss({
            filename: 'css/[name]_[contenthash:8].css',
        }),
    ],
    resolve: {
        extensions: ['.tsx', 'ts', '.js'],
    },
};
