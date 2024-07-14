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
    CustomWebpack.compiler.run((err, status) => {
        let info = status.toJson();

        info.errors.forEach((msg) => {
            console.log('\n', msg.details);
            console.log('\n', msg.stack);

        });

        if (err) {
            process.exit(10);
        }
        CustomWebpack.compiler.close(() => {});
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

export { devServerConfig, build, dev };
