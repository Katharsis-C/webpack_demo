import { filePath } from './../common/path';
import HTMLPlugin from 'html-webpack-plugin';

interface InitHtmlParams {
    fileName: string;
    title: string;
    chunks: Array<string>;
}

const initHtml = ({ fileName, title, chunks }: InitHtmlParams) => {
    return new HTMLPlugin({
        title,
        filename: `${title}/${fileName}`,
        template: `${filePath.root}/index.html`,
        minify: true,
        inject: true,
        chunks,
    });
};

export const htmls = [
    initHtml({
        fileName: 'index.html',
        title: 'index',
        chunks: ['common', 'index'],
    }),
    initHtml({
        fileName: 'login.html',
        title: 'login',
        chunks: ['common', 'login'],
    }),
];
