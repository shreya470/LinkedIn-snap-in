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

  const filePath = 'src\\functions\\file\\accountsProd.csv';

  readCSVFile(filePath)
  .then((data) => {
    console.log(data); 
  })
  .catch((error) => {
    console.error(error); 
  });
  
  console.log(events)
  
for(let event of events){
  const updateTask = 'https://api.data365.co/v1.1/linkedin/member/${event}/update?load_activities=true&max_activities=50&access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
  try {
    const resp = await fetch(updateTask, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }  
     
    });
  }
  catch (error) {
    console.log('Failed to post to timeline: ', error);
  }

  const getStatus ='https://api.data365.co/v1.1/linkedin/member/${event}/update?access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
  for (;;) {
    try {
      const resp = await fetch(getStatus, {
      method: 'GET',
      headers: {
      'content-type': 'application/json',
      'accept': 'application/json, text/plain, */*',
        }
      });
      const response = await resp.json();
      const status = response.data.status;
    
      if (status === 'pending') { 
      console.log('Status is pending. Calling API again...');
      continue;
      } else if (status === 'finished' || status === 'created') {
        break;
      }
    }
    catch (error) {
      console.log('Failed to post to timeline: ', error);
    }
  }
  const getCachedData ='https://api.data365.co/v1.1/linkedin/member/${event}?access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
  try{
      const resp = await fetch(getCachedData,{
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json, text/plain, */*',
        }
      });
      if (resp.ok) {
        console.log("Successfully got data.");
        let respJsonBody = await resp.json()
  
        console.log('shreya',respJsonBody.data)
        //const items=respJsonBody.data.items
        //const links =[]
        //console.log(items[0])
        //for(let item of items)
        //{ 
          //links.push({url:item.url})
         // links.push({name : item.auther_username, url : item.url, likes : item.likes})
  
        //}
          //console.log(links)
  
  }
  }
  catch (error) {
    console.log('Failed to get user data: ', error);
  }
  const getCachedPosts = 'https://api.data365.co/v1.1/linkedin/member/${event}/activity/created_post/posts?order_by=date_desc&access_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw==';
  let resp = undefined
  try{
    resp = await fetch(getCachedPosts,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }
    });
   // if (resp.ok) {
      //console.log("Successfully got data.");
      //let respJsonBody = await resp.json()

     // console.log('shreya',respJsonBody.data.items)
      //const items=respJsonBody.data.items
      //const links =[]
      //console.log(items[0])
      //for(let item of items)
      //{ 
        //links.push({url:item.url})
       // links.push({name : item.auther_username, url : item.url, likes : item.likes})

      //}
        //console.log(links)

//}
  }
  catch (error) {
    
    console.error('API error:', error); 
  }
  //response = resp?.json
  //for item in resp.data
  
    
} 
    


  return { 'input_event': events[0] };
}
export default run;