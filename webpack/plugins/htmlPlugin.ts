import { filePath } from './../common/path';
import HTMLPlugin from 'html-webpack-plugin';

interface InitHtmlParams {
    fileName: string;
    title: string;
    chunks: Array<string>;
    appname: string;
}

const initHtml = ({ fileName, title, chunks, appname }: InitHtmlParams) => {
    return new HTMLPlugin({
        title,
        filename: `${filePath.dist}/${appname}/${fileName}`,
        template: `${filePath.src}/${appname}/index.html`,
        minify: true,
        inject: 'body',
        chunks,
        scriptLoading: 'blocking',
    });
};

export const htmls = [
    initHtml({
        fileName: 'index.html',
        title: 'index',
        chunks: ['common', 'index'],
        appname: 'app1',
    }),
    // initHtml({
    //     fileName: 'login.html',
    //     title: 'login',
    //     chunks: ['common', 'login'],
    // }),
];
