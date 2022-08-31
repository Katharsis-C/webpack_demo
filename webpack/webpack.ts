import { scssLoader } from './modules/scssLoader';
import { esbuildLoader } from './modules/esbuildLoader';
import { filePath } from './common/path';
import { Compiler, webpack, Configuration } from 'webpack';
import { htmls } from './plugins/htmlPlugin';
import { minicssPlugin } from './plugins/minicssPlugin';

export class CustomWebpack {
    static config: Configuration = {
        mode: 'development',
        devtool: 'eval-source-map',
        target: ['web', 'es5'],
        entry: () => {
            return {
                index: `${filePath.src}/app1/index.ts`,
                // login: `${filePath.src}/app2/login/index.tsx`,
            };
        },
        output: {
            path: filePath.dist,
            publicPath: 'auto',
            filename: 'app1/js/[name]_[chunkhash:6].js',
            chunkFilename: 'common/js/[name]_[chunkhash:6].bundle.js',
        },
        context: filePath.src,
        module: {
            rules: [esbuildLoader, scssLoader],
        },
        plugins: [...htmls, minicssPlugin],
        resolve: {
            extensions: ['.tsx', 'ts', '.js'],
        },
    };

    static compiler: Compiler = null;

    static init = () => {
        // console.log(37, CustomWebpack.config)
        CustomWebpack.compiler = webpack(CustomWebpack.config);
        CustomWebpack.compiler.hooks.done.tap('done', () => {
            console.log(42);
        });
        CustomWebpack.compiler.hooks.failed.tap('failed', () => {
            console.log(45);
        });
    };
}
