import axios from 'axios';


// Type to return from both Post/Get calls
// and from each automation.
export type HTTPResponse = {
  success: boolean;
  errMessage: string;
  code: number;
  data: any;
};

const defaultResponse: HTTPResponse = {
  success: false,
  errMessage: '',
  code: 0,
  data: {},
};

interface ComponentMap {
  [key:string]: string
}

export async function postCall(
  endpoint: string,
  authKey: string,
  payload: Record<string, any>,
): Promise<HTTPResponse> {
  try {
    const res: any = await axios.post(endpoint, payload, {
      headers: {
        Authorization: authKey,
        'Content-type': 'application/json',
      },
    });

    const data = res.data;
    return { ...defaultResponse, code: res.status, success: true, data: data };
  } catch (error: any) {
    if (error.response) {
      return {
        ...defaultResponse,
        errMessage: error.response.data,
        code: error.code,
      };
    } else if (error.request) {
      return {
        ...defaultResponse,
        errMessage: error.request.data,
        code: error.code,
      };
    } else {
      return { ...defaultResponse, code: error.code, errMessage: error };
    }
  }
}

export async function getCall(
  endpoint: string,
  authKey: string,
): Promise<HTTPResponse> {
  try {
    const res = await axios.get(endpoint, {
      headers: {
        Authorization: authKey,
      },
    });
    const data = res.data;
    return { ...defaultResponse, success: true, data: data };
  } catch (error: any) {
    if (error.response) {
      return { ...defaultResponse, errMessage: error.response.data };
    } else if (error.request) {
      return { ...defaultResponse, errMessage: error.request.data };
    } else {
      return { ...defaultResponse, errMessage: error };
    }
  }
}

export function constructURL(
  endpoint: string,
  paramsAsPayload: Record<string, any>,
): string {
  const url = new URL(endpoint);
  const params = url.searchParams;
  for (const paramsKey in paramsAsPayload) {
    params.append(paramsKey, paramsAsPayload[paramsKey]);
  }
  return url.toString();
}

