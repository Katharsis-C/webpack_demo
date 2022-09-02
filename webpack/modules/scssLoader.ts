import MiniCss from 'mini-css-extract-plugin';
import { filePath } from '../common/path';

/**
 * scss loader
 */
export const scssLoader = {
    include: filePath.src,
    test: /\.scss$/,
    use: [MiniCss.loader, 'css-loader', 'sass-loader'],
};
