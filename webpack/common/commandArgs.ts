export interface ArgsType {
    apps: string;
    env: string;
}

export class CommandArgs {
    static apps: ReadonlyArray<string> | undefined = [];
    static env: string = 'dev';

    static init = (options: Partial<ArgsType>) => {
        this.apps = options.apps.split(',');
        this.env = options.env;
    };
    static checkIsApp = (id: string): boolean => {
        return this.apps.includes?.(id.toString());
    };
}
