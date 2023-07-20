import fs from 'fs';
import csv from 'csv-parser';
import { type } from 'os';
let base_url = "https://api.data365.co/v1.1/linkedin"
let access_token="ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKSmJtUnBZVzVKYm5OMGFYUjFkR1Z2WmxSbFkyaHViMnh2WjNsTFlXNXdkWElpTENKcFlYUWlPakUyT0RnMk16UXdOakF1TnpnME1UazJObjAuRWw1YllMTWtwbzdTRDNuVGRmSXlDZUtDMXhWSTgxbllLWm5QSE1Va19BYw=="

function readCSVFile(filePath: string): string | null {
  try {
    const csvData = fs.readFileSync(filePath, 'utf8');
    return csvData;
  } catch (err) {
    console.error('Error reading the file:', err);
    return null;
  }
}

function syncWriteFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, data, {
    flag: 'a+',
  });
}

function updatetask(comapany_uname: string){
  const updateTask = base_url + "/company/" + comapany_uname + "/update?access_token=" + access_token;
    fetch(updateTask, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }  
      
    })
    .then(async data =>{
      let datanew = await data.json();
      console.log(datanew.data.task_id)
    })
    .catch(error => 
      console.log('error', error)
    );
}
async function getstatus(comapany_uname: string): Promise<string>{
  const getStatus =base_url + "/company/" + comapany_uname + "/update?access_token=" + access_token;
  let max_tries = 300
  for (let tries  = 0; tries < max_tries; tries++) {
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
      } else if (status === 'created') {
        console.log(status)
        return status
      }
    }
    catch (error) {
      console.log('Failed to post to timeline: ', error);
      return "Error occured!!"
    }
    tries++;
  }
  return "Max tries reached"
}
export const run = async (events: any[]): Promise<Record<string, any>> => {
  console.info(events);
  const filePath = 'src\\functions\\company_fetcher\\company_unames.csv';
  const responsePath = 'src\\functions\\company_fetcher\\company_response.csv';
  let csvContent = readCSVFile(filePath);
  // syncWriteFile(responsePath, "hello")
  var company_uname = [""]
  if(csvContent != null){
    company_uname = csvContent.split(",\r\n")
    console.log(company_uname)
  }
  for (let i = 0; i < company_uname.length; i++) {
    updatetask(company_uname[i])
    let status = await getstatus(company_uname[i])
    console.log(status)
    const getCachedData = base_url + "/company/" + company_uname[i] + "?access_token=" + access_token;
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
        let response = await resp.json();
        syncWriteFile(responsePath, "CompanyName,Followers Count,Username,Website URL,\n")
        let temp = ""
        temp = response.data.name+","+response.data.followers_count+","+response.data.founded_date+","+response.data.username+","+response.data.website_url+","
        
        syncWriteFile(responsePath, temp + "\n")
      }
    }
    catch (error) {
      console.log('Failed to get user data: ', error);
    }
    const getCachedPosts = base_url + "/company/" + company_uname[i] + "/feed/posts?order_by=date_desc&max_page_size=50&access_token=" + access_token;
    try{
      const resp = await fetch(getCachedPosts,{
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json, text/plain, */*',
        }
      });
      if (resp.ok){
        console.log("Successfully got posts.");
        let response = await resp.json();
        syncWriteFile(responsePath, "Url,Comment Count,Created Time,Empathy Count,Entertainment Count,Interest Count,Like Count,Praise Count,Share Count,View Count,\n")
        for (let idx = 0; idx < response.data.items.length; idx++){
          let temp = ""
          temp = temp + response.data.items[idx].url + "," + response.data.items[idx].comments_count + "," + response.data.items[idx].created_time + "," + response.data.items[idx].like_count + "," + response.data.items[idx].entertainment_count + "," + response.data.items[idx].interest_count + "," + response.data.items[idx].empathy_count + "," + response.data.items[idx].praise_count + "," + response.data.items[idx].shares_count + "," + response.data.items[idx].views_count + ","
          syncWriteFile(responsePath, temp +"\n")
        } 
        
      }
    }
    catch (error) {
      console.log('Failed to get company data: ', error);
    }
  }
  return { 'input_event': events[0] };
}
export default run;
