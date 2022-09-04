import { filePath } from './../common/path';
import HTMLPlugin from 'html-webpack-plugin';
import { CommandArgs } from '../common/commandArgs';

/* 生成html参数 */
interface HtmlGenParams {
    title: string;
    chunks: Array<string>;
    appname: string;
}

/* 生成html方法 */
export const genHtml = ({ title, chunks, appname }: HtmlGenParams) => {
    return new HTMLPlugin({
        title,
        filename: `${filePath.dist}/${appname}/index.html`,
        template: `${filePath.src}/${appname}/index.html`,
        minify: true,
        inject: 'body',
        chunks,
        scriptLoading: 'blocking',
    });
};

/* html模板 */
export const htmlPlugin = CommandArgs.apps.map((appname) => {
    return genHtml({
        title: appname,
        chunks: ['common', appname],
        appname: appname,
    });
});
