import * as R from 'ramda';
import http   from 'http';
import https  from 'https';
import std    from 'Utilities/stdutils';

const env = process.env.NODE_ENV || 'development';
const min = 2000;
const max = 5000;
const throttle = () => Math.floor(Math.random() * (max + 1 - min) + min);

/*
 * HTTPS/HTTP request
 *
 * @param {object} options - 
 */
const fetch = function(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if(error) return reject(error);
      resolve(response);
    });
  });
};

/*
 * HTTPS/HTTP request
 *
 * @param {string} method - 
 * @param {string} url - 
 * @param {object} auth -
 * @param {object} head - 
 * @param {object} body -
 * @param {string} type - 
 * @param {string} search - 
 * @param {function} callback -
 */
const request = function({ method, url, search, auth, header, body, type }, callback) {
  const api      = std.parse_url(url);
  const hostname = api.hostname;
  const protocol = api.protocol;
  const port     = api.port || (protocol === 'https:' ? 443 : 80);
  const query    = api.query;
  let   path     = api.pathname;
  if (query)  { 
    path += '?' + query; 
  } else if (search) { 
    path += '?' + std.urlencode_rfc3986(search); 
  }
  let postData = null, postType = null;
  if (body && body instanceof Buffer) {
    postType = 'application/octet-stream';
    postData = body;
  } else if (body && typeof body === 'string' && type === 'XML') {
    postType = 'application/xml; charset="UTF-8"';
    postData = body;
  } else if (body && typeof body === 'string') {
    postType = 'text/plain; charset="UTF-8"';
    postData = body;
  } else if (body && typeof body === 'object' && type === 'JSON') {
    postType = 'application/json';
    postData = JSON.stringify(body); 
  } else if (body && typeof body === 'object' && type === 'NV') {
    postType = 'application/x-www-form-urlencoded';
    postData = std.urlencode_rfc3986(body);  
  } else {
    postType = 'text/plain; charset="UTF-8"';
    postData = '';
  }
  const headers = R.merge({
    'Accept':           'application/json'
  , 'Accept-Charset':   'utf-8'
  , 'Accept-Language':  'ja-JP'
  , 'Content-Length':   postData ? Buffer.byteLength(postData) : 0
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
    let data = '';
    res.setEncoding('utf8');
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const status = { name: `Status Code: ${res.statusCode}`, message: JSON.parse(data), stack: res.headers };
      switch (res.statusCode) {
        case 101: case 102: case 103: case 104: case 105: case 106:
          callback(status);
          break; 
        case 200: case 201: case 202: case 204:
          callback(null, data);
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
