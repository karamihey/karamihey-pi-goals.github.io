// utils
import { RequestError } from 'utils/exceptions';

const baseUrl = process.env.REACT_APP_API_URL;
const contentTypes = {
  json: 'application/json',
  text: 'text/html',
};

const encodeQueryData = (data: any) => {
  if (!data) {
    return '';
  }

  try {
    const queryStringStart = '?';

    return Object.keys(data).reduce((queryString, key, index) => {
      const paramStringStart = index ? '&' : '';
      const paramString = `${paramStringStart}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;

      return queryString + paramString;
    }, queryStringStart);
  } catch (e) {
    throw new TypeError('Error: incorrect query data format.');
  }
};

const stringifyBodyData = (data: any) => {
  if (!data) {
    return null;
  }
  try {
    return JSON.stringify(data);
  } catch (e) {
    throw new TypeError('Error: incorrect send data format.');
  }
};

const getResponseData = (response: Response) => {
  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.includes(contentTypes.text)) {
    return response.text();
  }

  if (contentType.includes(contentTypes.json)) {
    return response.json();
  }

  throw new TypeError('Error: incorrect received data format.');
};

const sendRequest = async (url:string = '', options = {}) => {
  const requestUrl = baseUrl + url;
  const requestHeaders = new Headers({
    'Content-Type': contentTypes.json,
  });

  const authToken = null; // ToDo: get actual token.
  if (authToken) {
    requestHeaders.append('X-AUTH-TOKEN', authToken);
  }

  const requestOptions = {
    headers: requestHeaders,
    ...options,
  };

  const response: Response = await fetch(requestUrl, requestOptions);
  const responseData = await getResponseData(response);

  if (!response.ok) {
    throw new RequestError(response.status, responseData);
  }

  return responseData;
};

export const sendGetRequest = (url: string, data?: any) => {
  const requestUrl = url + encodeQueryData(data);
  const requestOptions = {
    method: 'GET',
  };

  return sendRequest(requestUrl, requestOptions);
};

export const sendPostRequest = (url: string, data?: any) => {
  const requestOptions = {
    method: 'POST',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendPutRequest = (url: string, data?: any) => {
  const requestOptions = {
    method: 'PUT',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};

export const sendDeleteRequest = (url: string, data?: any) => {
  const requestOptions = {
    method: 'DELETE',
    body: stringifyBodyData(data),
  };

  return sendRequest(url, requestOptions);
};
