import fs from 'fs';
import csv from 'csv-parser';

async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
export const run = async (events: any[]): Promise<Record<string, any>> => {
  console.info(events);

const filePath = 'src\functions\file\accountsProd.csv';

readCSVFile(filePath)
  .then((data) => {
    console.log(data); // This will log the parsed data as an array of objects
  })
  .catch((error) => {
    console.error(error); // This will log any errors that occurred during the parsing process
  });

  const url = 'https://api.data365.co/v1.1/linkedin/member/rshruthi/update?load_activities=true&max_activities=50&access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }
     
    });

    const url2 ='https://api.data365.co/v1.1/linkedin/member/rshruthi/update?access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
    try{
      const resp = await fetch(url2,{
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json, text/plain, */*',
        }

      })
    }


    return { 'input_event': events[0] };
};

export default run;







