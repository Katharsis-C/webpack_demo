import MiniCss from 'mini-css-extract-plugin';


/**
 * miniplugin
 */
export const minicssPlugin = new MiniCss({
    filename: `[name]/css/[name]_[contenthash:6].css`,
});
