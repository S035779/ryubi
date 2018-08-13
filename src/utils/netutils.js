import * as R           from 'ramda';
import PromiseThrottle  from 'promise-throttle';
import http             from 'http';
import https            from 'https';
import std              from 'Utilities/stdutils';

const displayName = 'netutils';

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 1
, promiseImplementation: Promise
});

const fetch = function(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if(error) return reject(error);
      std.logDebug(displayName, 'FETCH', 'promise done.');
      resolve(response);
    });
  });
};

const throttle = options => {
  return promiseThrottle.add(fetch.bind(this, options));
};

const request = ({ url, method, header, search, auth, body, type, accept, parser }, callback) => {
  const api           = std.parse_url(url);
  const hostname      = api.hostname;
  const protocol      = api.protocol;
  const port          = api.port || (protocol === 'https:' ? 443 : 80);
  const query         = api.search;
  let   path          = api.pathname;
  let   postData      = null;
  let   postType      = null;
  let   postLen       = null;
  let   acceptType    = null;
  if (query)  { 
    path += query; 
  } else if (search) { 
    path += '?' + std.urlencode_rfc3986(search); 
  }
  if (body && body instanceof Buffer) {
    postType = 'application/octet-stream';
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'string' && type === 'XML') {
    postType = 'application/xml; charset="UTF-8"';
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'string') {
    postType = 'text/plain; charset="UTF-8"';
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'object' && type === 'JSON') {
    postType = 'application/json';
    postData = JSON.stringify(body); 
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'object' && type === 'NV') {
    postType = 'application/x-www-form-urlencoded';
    postData = std.urlencode_rfc3986(body);  
    postLen  = Buffer.byteLength(postData);
  } else {
    postType = 'text/plain; charset="UTF-8"';
    postData = '';
    postLen  = 0;
  }
  if(accept && accept === 'JSON') {
    acceptType = 'application/json';
    parser = JSON.parser;
  } else if(accept && accept === 'XML') {
    acceptType = 'application/xml; charset="UTF-8"';
  } else {
    acceptType = 'text/plain; charset="UTF-8"';
  }
  const headers = R.merge({
    'Accept':           acceptType
  , 'Accept-Language':  'ja-JP'
  , 'Content-Length':   postLen
  , 'Content-Type':     postType
  }, header);
  if(auth && auth.bearer) {
    headers['Authorization'] = ' Bearer ' + auth.bearer;
  } else if(auth && auth.user && auth.pass) {
    headers['Authorization'] = 'Basic ' + std.encode_base64(auth.user + ':' + auth.pass);
  }
  const client = protocol === 'https:' ? https : http;
  const params = { hostname, port, path, method, headers };
  const req = client.request(params, res => {
    let request = '';
    res.setEncoding('utf8');
    res.on('data', chunk => request += chunk);
    res.on('end', () => {
      request = parser ? parser(response) : response;
      const status 
        = { name: `Status Code: ${res.statusCode} / Request URL: ${url}`, message: response, stack: res.headers };
      switch (res.statusCode) {
        case 101: case 102: case 103: case 104: case 105: case 106:
          callback(status);
          break; 
        case 200: case 201: case 202: case 204:
          callback(null, response);
          break;
        case 301: case 302:
          callback(status);
          break; 
        case 400: case 401: case 402: case 403: case 404:
          callback(status);
          return; 
        case 500: case 501: case 502: case 503: case 504: case 505:
          callback(status);
          break;
        default:
          callback(status);
          break;
      }
    });
  });
  req.on('error', err => callback({ name: err.code, message: err.message }));
  req.write(postData);
  req.end();
};

export default { fetch, request };
