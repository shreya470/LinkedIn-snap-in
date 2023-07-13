export declare const functionFactory: {
    readonly file: (events: any[]) => Promise<Record<string, any>>;
    readonly function_2: (events: any[]) => Promise<Record<string, any>>;
};
export type FunctionFactoryType = keyof typeof functionFactory;
