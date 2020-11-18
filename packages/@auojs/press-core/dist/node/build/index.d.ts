import webpack from 'webpack';
import AuoPress from '../AuoPress';
export declare function compile(config: webpack.Configuration): Promise<unknown>;
export default class Build {
    private webpackConfig;
    private context;
    constructor(context: AuoPress);
    process(): Promise<void>;
    render(): Promise<void>;
    getWebpackConfig(): void;
}
