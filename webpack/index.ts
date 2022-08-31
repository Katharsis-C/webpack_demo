import { filePath } from './common/path';
import { CustomWebpack } from './webpack';
import Server from 'webpack-dev-server/lib/Server';
import WebpackDevServer from 'webpack-dev-server';

const devServerConfig: WebpackDevServer.Configuration = {
    static: {
        directory: filePath.src,
    },
    // open: 'app1',
    client: {
        progress: true,
    },
};

const build = () => {
    CustomWebpack.init();
    CustomWebpack.compiler.run((err, stats) => {
        if (err) {
            console.log(5, { err });
            process.exit(10);
        }
        CustomWebpack.compiler.close((err) => {});
    });
};

const dev = () => {
    CustomWebpack.init();

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
build();

export { devServerConfig, build, dev };
