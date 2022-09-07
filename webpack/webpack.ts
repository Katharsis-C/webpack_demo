import { fileLoader } from './modules/fileLoader';
import { scssLoader } from './modules/scssLoader';
import { buildLoader } from './modules/buildLoader';
import { filePath } from './common/path';
import { Compiler, webpack, Configuration } from 'webpack';
import { htmlPlugin } from './plugins/htmlPlugin';
import { minicssPlugin } from './plugins/minicssPlugin';
import { CommandArgs } from './common/commandArgs';
import { definePlugin } from './plugins/definedPlugin';
import CssMinimizer from 'css-minimizer-webpack-plugin';
// import { ESBuildMinifyPlugin } from 'esbuild-loader';
const { ESBuildMinifyPlugin } = require('esbuild-loader');

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
            filename: `[name]/js/[name]_[chunkhash:6].js`,
            chunkFilename: 'common/js/[name]_[chunkhash:6].bundle.js',
            assetModuleFilename: 'asset/image/[hash:6][ext][query]',
        },
        context: filePath.src,
        module: {
            rules: [buildLoader, scssLoader, fileLoader],
        },
        plugins: [...htmlPlugin, minicssPlugin, definePlugin],
        resolve: {
            extensions: ['.tsx', 'ts', '.js'],
        },
        optimization: {
            /* enable in development mode */
            minimize: true,

            minimizer: [
                new CssMinimizer(),
                new ESBuildMinifyPlugin({
                    target: 'es2015',
                    keepNames: true,
                }),
            ],
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
