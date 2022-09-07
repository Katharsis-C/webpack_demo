import { filePath } from './../common/path';
import { RuleSetRule } from 'webpack';

export const fileLoader: RuleSetRule = {
    test: /\.jpg|.png$/,
    include: [filePath.src],
    type: 'asset/resource',
    
};
