export interface ArgsType {
    apps: string;
    env: string;
}


export class CommandArgs {
    static apps: any = [];
    static env: string = 'dev';

    static init =  (options: Partial<ArgsType>) => {
        this.apps = options.apps.split(',');
        this.env = options.env
    };
}