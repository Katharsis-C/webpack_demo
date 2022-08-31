import MiniCss from 'mini-css-extract-plugin';

export const minicssPlugin = new MiniCss({
    filename: 'app1/css/[name]_[contenthash:6].css',
});
