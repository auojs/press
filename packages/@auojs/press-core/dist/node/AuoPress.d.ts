import BuildProcess from './build';
export interface AuoPressConfig {
    sourceDir: string;
    auopressDir?: string;
    outDir?: string;
}
export default class AuoPress {
    config: AuoPressConfig;
    buildProcess: BuildProcess;
    constructor(config: AuoPressConfig);
    process(): Promise<void>;
    build(): Promise<this>;
}
