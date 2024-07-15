import MiniCss from 'mini-css-extract-plugin';
import { CommandArgs } from '../common';

/**
 * miniplugin
 */
export const minicssPlugin = new MiniCss({
    filename: (pathData) => {
        const id = pathData?.chunk?.id;
        if (CommandArgs.checkIsApp(id.toString())) {
            return `[name]/css/[name]_[chunkhash:6].css`;
        }
        return `vendor/css/[name]_[contenthash:6].css`;
    },

    chunkFilename: `[name]/css/[name]_[contenthash:6].css`,
});
