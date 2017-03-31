import fetch from 'isomorphic-fetch'
import { getSetting } from '../../settings';

const paramStringBuilder = (obj) => {
  let output = '';

  if (!obj) {
    return output;
  }
  Object.keys(obj).forEach((key) => {
    output += key + '=' + obj[key] + '&';
  });
  return output;
}

const getRequestURLBuilder = (endpoint, queryParams) => {
  return getSetting('apiEndpoint') + endpoint + '?' + paramStringBuilder(queryParams);
}

export default (endpoint, method, queryParams, payload = null) => {
  if (method === 'GET') {
    let requestURL = getRequestURLBuilder(endpoint, queryParams);
    return fetch(`${requestURL}`);

  } else if (method === 'POST') {
    //POST
    let requestURL = getRequestURLBuilder(endpoint, queryParams);
    return fetch(`${requestURL}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
}
