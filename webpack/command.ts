import { ArgsType, CommandArgs } from './common/commandArgs';
import { program } from 'commander';

/**
 * @description 加载cli参数
 * @param {ArgsType} option 选项
 */
const initOption = (option: ArgsType) => {
    CommandArgs.init(option);
};

/**
 * @description 加载webpack实例
 */
const initWebpack = async () => {
    /* 按需加载 */
    const { CustomWebpack } = await import('./webpack');
    CustomWebpack.init();
};

program.version('0.0.0');

/**
 * @description cli参数类
 * @export
 * @class CommandOptions
 */
export class CommandOptions {
    static apps = program.createOption('--apps [value]', '构建的应用');
    static env = program.createOption('--env [value]', '构建环境');
}



/** 构建 */
program
    .command('build')
    .addOption(CommandOptions.apps)
    .addOption(CommandOptions.env)
    .action(async (args: ArgsType) => {
        initOption(args);
        initWebpack();
        /* 按需加载 */
        await import('./index').then(({ build }) => {
            build();
        });
    });

program.parse();
