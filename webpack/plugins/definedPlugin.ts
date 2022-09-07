import { CommandArgs } from './../common/commandArgs';
import { DefinePlugin } from 'webpack';

export const definePlugin = new DefinePlugin({
    'process.env': JSON.stringify(CommandArgs.env),
});
