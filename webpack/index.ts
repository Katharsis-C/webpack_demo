import { resolve } from 'path';
import { CustomWebpack } from './webpack';
const run = () => {
    CustomWebpack.init();
    CustomWebpack.compiler.run((err, stats) => {
        // console.log(6, stats)
        if (err) {
            console.log(5, { err });
            process.exit(10);
        }
        CustomWebpack.compiler.close(err=>{
            err&&console.log(12, {err})
        })
    });
};

run();
