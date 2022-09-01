import { filePath } from './common/path';
import { CustomWebpack } from './webpack';
import Server from 'webpack-dev-server/lib/Server';
import WebpackDevServer from 'webpack-dev-server';

const devServerConfig: WebpackDevServer.Configuration = {
    static: {
        directory: filePath.src,
    },
    client: {
        progress: true,
    },
};

/* 构建 */
const build = () => {
    CustomWebpack.compiler.run((err, stats) => {
        if (err) {
            process.exit(10);
        }
        CustomWebpack.compiler.close((err) => {});
    });
};

/* 开发 */
const dev = () => {
    const devServer = new Server(devServerConfig, CustomWebpack.compiler);
    (async () => {
        await devServer.start();
        process.on('SIGINT', () => {
            process.exit();
        });
    })();
};

// XXX: 开发
// dev();

// XXX: 构建
// build();



export { devServerConfig, build, dev };
