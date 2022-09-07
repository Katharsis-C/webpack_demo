import { fileLoader } from './modules/fileLoader';
import { scssLoader } from './modules/scssLoader';
import { esbuildLoader } from './modules/esbuildLoader';
import { filePath } from './common/path';
import { Compiler, webpack, Configuration } from 'webpack';
import { htmlPlugin } from './plugins/htmlPlugin';
import { minicssPlugin } from './plugins/minicssPlugin';
import { CommandArgs } from './common/commandArgs';
import { definePlugin } from './plugins/definedPlugin';

export class CustomWebpack {
    static config: Configuration = {
        mode: 'development',
        devtool: 'eval-source-map',
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
            rules: [esbuildLoader, scssLoader, fileLoader],
        },
        plugins: [...htmlPlugin, minicssPlugin, definePlugin],
        resolve: {
            extensions: ['.tsx', 'ts', '.js'],
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
