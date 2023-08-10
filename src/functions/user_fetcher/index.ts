import fs from 'fs'; 
import csv from 'csv-parser';
import { type } from 'os'; 
import axios from 'axios';
let getposts=false;
const base_url = 'https://api.data365.co/v1.1/linkedin';

function updatetask(api_url: string, access_token: string){
  const updateTask = api_url + "/update?load_activities=true&max_activities=50&access_token=" + access_token;
    fetch(updateTask, { 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }  
      
    })
    .then(async data =>{  
      let datanew = await data.json();
    })
    .catch(error => 
      console.log('error', error)
    );
}

async function getstatus(api_url: string, access_token: string): Promise<string>{
  const getStatus = api_url + "/update?access_token=" + access_token;
  let max_tries = 200
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
      if (status === 'pending' || status === 'created') { 
      console.log('Status is pending. Calling API again...');
      continue;
      } else if (status === 'finished') {
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

async function getCachedData(api_url: string, access_token: string){
  const getCachedData = api_url + "?access_token=" + access_token;
  console.log(getCachedData)
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
      console.log(response)
      let temp = "Full name" + "," + "Connection Count" + "," + "Follower Count" + ","
      for (let idx = 0; idx < response.data.positions.length; idx++){
        temp = temp + "Company " + idx.toString() + "," + "Timeline" + idx.toString() + ","
      }
      temp = ""
      for (let idx = 0; idx < response.data.positions.length; idx++){
        temp = temp+response.data.positions[idx].company.name+","+response.data.positions[idx].date_text+","
      }
    }
  }
  catch (error) {
      console.log('Failed to get user data: ', error);
    }
} 

async function getCachedPosts(api_url: string, access_token: string){
  const getCachedPosts = api_url + "/activity/created_post/posts?order_by=date_desc&max_page_size=100&access_token=" + access_token;
  try{
    const resp = await fetch(getCachedPosts,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
      }
    });
    if (resp.ok){
      console.log("Successfully got data.");
      let response = await resp.json();
      for (let idx = 0; idx < response.data.items.length; idx++){
        let temp = ""
        temp = temp + response.data.items[idx].url + "," + response.data.items[idx].comments_count + "," + response.data.items[idx].created_time + "," + response.data.items[idx].empathy_count + "," + response.data.items[idx].entertainment_count + "," + response.data.items[idx].interest_count + "," + response.data.items[idx].like_count + "," + response.data.items[idx].praise_count + "," + response.data.items[idx].shares_count + "," + response.data.items[idx].views_count + ","
      } 
      
    }
  }
  catch (error) {
    console.log('Failed to get user data: ', error);
  }
} 

async function getUserNames(bqToken: string) {
  //TODO: to be replaced with Big query data

  let user_details = await executeQuery(bqToken, BQ_PROJECT, BQ_QUERY);
  console.log(user_details);

  if (user_details.length == 0) {
    user_details = [
      {
        id: 'don_id',
        linkedinUserProfileUrl: 'https://www.linkedin.com/company/mohanmaturi/',
      },
      {
        id: 'don_id',
        linkedinUserProfileUrl: 'https://www.linkedin.com/showcase/rshruthi/',
      },
    ];
  }
  return user_details;
}

function extractUsernames(user_details: any[]) {
  const usernames = [];

  for (let i = 0; i < user_details.length; i++) {
    const url = user_details[i].linkedinCompanyUrl;
    const parts = url.split('/');
    let username = parts[parts.length - 2];
    usernames.push(username);
  }
  return usernames;
}


//BQ
interface MappingType {
  [key: string]: string;
}

const BQ_PROJECT = 'app-devrev-prod';
//TODO: Need to change the query
const BQ_QUERY = `
#standardSQL
SELECT id, JSON_EXTRACT(custom_fields, '$.tnt__zoominfo_enrich[0].socialMediaUrls[0].url') AS linkedinCompanyUrl FROM us_east1_devrev.dim_account WHERE dev_oid = 'DEV-0' AND JSON_EXTRACT(custom_fields, '$.tnt__zoominfo_enrich') IS NOT NULL
`;
const executeQuery = async (key: string, project: string, query: string) => {
  const formatResponse = (response: any) => {
    const formatted: MappingType[] = [];
    const { schema, rows } = response;
    const { fields } = schema;
    for (const row of rows) {
      const formattedRow: MappingType = {};
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const value = row.f[i].v;
        formattedRow[field.name] = value;
      }
      formatted.push(formattedRow);
    }
    return formatted;
  };

  try {
    const bqClient = axios.create({
      baseURL: `https://bigquery.googleapis.com/bigquery/v2/projects/${project}`,
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data = { query };
    const res = await bqClient.post('queries', data);
    // console.log(res.data);
    return formatResponse(res.data);
  } catch (err: any) {
    console.log('BQ Error :', err.response.data.error);
    return [];
  }
};




export const run = async (events: any[]) =>{
  console.info(events);
  for (let event of events) {
    const access_token = event.input_data.keyrings.linkedin_token;
    const bq_token = event.input_data.keyrings.bq_token;
    const devrev_url = event.execution_metadata.devrev_endpoint;
    const devrev_token = event.context.secrets.service_account_token;
    var company_uname = await getUserNames(bq_token);
    break;
    var usernames = extractUsernames(company_uname);
    for (let i = 0; i < usernames.length; i++) {
      const api_url = base_url + "/member/" + usernames[i]
      console.log(api_url);
      updatetask(api_url, access_token);
      let status = await getstatus(usernames[i], access_token);
      console.log(status);

      if (status != 'Max tries reached') {
        const data = await getCachedData(api_url, access_token);
        if (data != null) {
          const account = {
            id: '',
            custom_fields: { tnt__linkedin_enrich: JSON.stringify(data) },
          };
          console.log(account);
          //await updateAccount(devrev_token, devrev_url, account);
        }
        if (getposts) {
          await getCachedPosts(api_url, access_token);
        }
      }
    }
  }
};

export default run;
