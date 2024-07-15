// import MiniCss from 'mini-css-extract-plugin';
// import { urlLoader } from './modules/rawLoader';
import CssMinimizer from 'css-minimizer-webpack-plugin';
import ESBuildMinifyPlugin from 'esbuild-loader/dist/minify-plugin';
import { Compiler, Configuration, webpack } from 'webpack';
import { CommandArgs, filePath } from './common';
import { buildLoader, fileLoader, scssLoader } from './modules';
import { definePlugin, htmlPlugin, minicssPlugin } from './plugins';
// const { ESBuildMinifyPlugin } = require('esbuild-loader');
import WebpackBarPlugin from 'webpackbar';

/**
 * 封装webpack
 */
export class CustomWebpack {
    static config: Configuration = {
        mode: 'development',
        // devtool: false,
        devtool: CommandArgs.env === 'test' ? false : 'eval-source-map',
        target: ['web', 'es5'],
        entry: () => {
            const entry = {};
            CommandArgs.apps.forEach((appName) => {
                entry[appName] = `${filePath.src}/${appName}/index.ts`;
            });
            return entry;
        },
        output: {
            path: filePath.dist,
            publicPath: 'auto',
            filename: (pathData) => {
                const id = pathData?.chunk?.id;
                if (CommandArgs.checkIsApp(id.toString())) {
                    return `[name]/js/[name]_[chunkhash:6].js`;
                }
                return `vendor/js/[name]_[chunkhash:6].js`;
            },
            // chunkFilename: 'common/js/[name]_[chunkhash:6].bundle.js',
            assetModuleFilename: 'asset/image/[hash:6][ext][query]',
        },
        context: filePath.src,
        module: {
            rules: [
                {
                    oneOf: [scssLoader, buildLoader, fileLoader],
                },
            ],
            // rules: [buildLoader, scssLoader, fileLoader, urlLoader],
        },
        plugins: [
            ...htmlPlugin,
            minicssPlugin,
            definePlugin,
            new WebpackBarPlugin({}),
        ],
        resolve: {
            extensions: ['.tsx', 'ts', '.js'],
            symlinks: false,
        },
        optimization: {
            /* enable in development mode */
            minimize: true,
            minimizer: [
                /**
                 * css压缩
                 */
                new CssMinimizer(),
                /**
                 * esbuild-js压缩
                 */
                new ESBuildMinifyPlugin({
                    target: 'es2015',
                    keepNames: true,
                }),
            ],
            /**
             * chunk设置, 抽离公共模块
             */
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 3,
                maxAsyncRequests: 5,
                minChunks: 1,
                cacheGroups: {
                    common: {
                        chunks: 'initial',
                        minSize: 1,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        name: 'common',
                    },
                    react: {
                        chunks: 'initial',
                        priority: 30,
                        test: /node_modules[\\/]react(-.*)?/,
                        minSize: 0,
                        name: 'react-vendor',
                    },
                    antd: {
                        chunks: 'initial',
                        priority: 30,
                        test: /node_modules[\\/]antd/,
                        minSize: 0,
                        name: 'antd',
                    },
                },
            },
        },
        /**
         * 指定loader的路径
         * //FIXME: 不配置将会在项目根目录下查找, 原因不明(yarn link状态下)
         * //XXX: 需要额外配置loader搜寻路径
         */
        resolveLoader: {
            modules: [filePath.nodeModule],
        },
    };

    static compiler: Compiler = null;

    static init = () => {
        CustomWebpack.compiler = webpack(CustomWebpack.config);
        CustomWebpack.compiler.hooks.done.tap('done', () => {
            // console.log(42);
        });
        CustomWebpack.compiler.hooks.failed.tap('failed', (err) => {
            console.log(45, err);
        });
    };
}
