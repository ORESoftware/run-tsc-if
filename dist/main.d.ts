export declare type EVCb<T, E = any> = (err?: E, val?: T) => void;
export interface RunOpts {
    projectRoot: string;
    rootDir?: string;
    outDir?: string;
}
export declare const r2gSmokeTest: () => Promise<boolean>;
export declare const getShellCommandString: (opts: RunOpts) => string;
export declare const run: (opts: RunOpts) => string;
