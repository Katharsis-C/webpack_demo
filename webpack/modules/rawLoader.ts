import { filePath } from './../common/path';
import { RuleSetRule } from 'webpack';

export const urlLoader: RuleSetRule = {
    test: /\.svg$/,
    include: [filePath.src],
    /** 等同于以往url-loader */
    type: 'asset/inline',
};
