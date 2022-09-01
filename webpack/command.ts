import { ArgsType, CommandArgs } from './common/commandArgs';
import { program } from 'commander';

/* 加载cli配置 */
const initOption = (option) => {
    CommandArgs.init(option);
};

/* 加载webpack实例 */
const initWebpack = () => {
    /* 必须使用require */
    const { CustomWebpack } = require('./webpack');
    CustomWebpack.init();
};

program.version('0.0.0');

export class CommandOptions {
    static apps = program.createOption('--apps [value]');
    static env = program.createOption('--env [value]');
}

program
    .command('build')
    .addOption(CommandOptions.apps)
    .addOption(CommandOptions.env)

    .action((args: ArgsType) => {
        initOption(args);
        initWebpack();

        /* 必须使用require */
        require('./index').build();
    });

program.parse();
