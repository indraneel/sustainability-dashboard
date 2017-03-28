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

const getRequestURLBuilder = (endpoint, params) => {
  return getSetting('apiEndpoint') + endpoint + '?' + paramStringBuilder(params);
}

export default (endpoint, method, params) => {
  if (method === 'GET') {
    let requestURL = getRequestURLBuilder(endpoint, params);
    return fetch(`${requestURL}`);

  } else {
    //POST
  }
}
