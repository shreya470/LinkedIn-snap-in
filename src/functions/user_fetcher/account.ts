import axios from 'axios';
const DEVREV_ENDPOINT_ACCOUNTS_UPDATE = '/internal/accounts.update';

async function postCallAPI(endpoint: string, payload: any, authKey: string) {
  try {
    const res: any = await axios.post(endpoint, payload, {
      headers: {
        Authorization: authKey,
        'Content-type': 'application/json',
      },
    });
    const data = res.data;
    return { success: true, message: 'Data successfully fetched', data: data };
  } catch (error: any) {
    if (error.response) {
      return { success: false, message: error.response.data };
    } else if (error.request) {
      return { success: false, message: error.request.data };
    } else {
      return { success: false, message: error };
    }
  }
}
export async function updateAccount(token: string, url: string, account: any) {
  // TODO: to be removed before deployment
  account.id = 'don:identity:dvrv-us-1:devo/0:account/1Y7YId5q'; // sample account to test locally

  let response: any = await postCallAPI(
    url + DEVREV_ENDPOINT_ACCOUNTS_UPDATE,
    token,
    account
  );
  console.log(response);
}

//
