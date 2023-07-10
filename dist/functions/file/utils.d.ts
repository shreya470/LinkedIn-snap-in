export type HTTPResponse = {
    success: boolean;
    errMessage: string;
    code: number;
    data: any;
};
export declare function postCall(endpoint: string, authKey: string, payload: Record<string, any>): Promise<HTTPResponse>;
export declare function getCall(endpoint: string, authKey: string): Promise<HTTPResponse>;
export declare function constructURL(endpoint: string, paramsAsPayload: Record<string, any>): string;
