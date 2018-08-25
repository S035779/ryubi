import * as R           from 'ramda';
import PromiseThrottle  from 'promise-throttle';
import http             from 'http';
import https            from 'https';
import std              from 'Utilities/stdutils';
import log              from 'Utilities/logutils';

const displayName = 'netutils';

const mimes = {
  NV: 'application/x-www-form-urlencoded'
, JSON: 'application/json'
, XML:  'application/xml; charset="UTF-8"'
, BIN:  'application/octet-stream'
, TXT:  'text/plain; charset="UTF-8"'
};

const min = 2000;
const max = 5000;
const retry = () => Math.floor(Math.random() * (max - min + 1) + min);

const promiseThrottle = new PromiseThrottle({ requestsPerSecond: 0.3, promiseImplementation: Promise });

const throttle = (url, options) => promiseThrottle.add(fetch.bind(this, url, options));

const fetch = (url, options) => {
  return new Promise((resolve, reject) => {
    request(url, options, (error, response) => {
      if(error) return reject(error);
      resolve(response);
    });
  });
};

const request 
  = (url, { method, header, search, auth, body, type, accept, parser, lang, operator }, callback) => {
  //log.trace(displayName, 'Request:', { url, method, header, search, auth, body, type, accept, parser, lang, operator });
  const api           = std.parse_url(url);
  const hostname      = api.hostname;
  const protocol      = api.protocol;
  const port          = api.port || (protocol === 'https:' ? 443 : 80);
  const query         = api.search;
  let   path          = api.pathname;
  let   postType      = null;
  let   postData      = null;
  let   postLen       = null;
  let   acceptType    = null;
  if (query)  { 
    path += query; 
  } else if (search && operator) { 
    path += '?' + std.urlencode_rfc3986(operator(search)); 
  } else if(search) {
    path += '?' + std.urlencode_rfc3986(search); 
  }
  if (body && body instanceof Buffer) {
    postType = mimes['BIN'];
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'string' && type === 'XML') {
    postType = mimes['XML'];
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'string') {
    postType = mimes['TXT'];
    postData = body;
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'object' && type === 'NV') {
    postType = mimes['NV'];
    postData = std.urlencode_rfc3986(body);  
    postLen  = Buffer.byteLength(postData);
  } else if (body && typeof body === 'object' && type === 'JSON') {
    postType = mimes['JSON'];
    postData = JSON.stringify(body); 
    postLen  = Buffer.byteLength(postData);
  } else {
    postType = mimes['TXT'];
    postData = '';
    postLen  = 0;
  }
  if(accept && accept === 'JSON') {
    acceptType = mimes['JSON'];
  } else if(accept && accept === 'XML') {
    acceptType = mimes['XML'];
  } else {
    acceptType = mimes['TXT'];
  }
  const headers = R.merge({
    'Accept':           acceptType
  , 'Accept-Language':  lang || 'ja-JP'
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
    let response = '';
    res.setEncoding('utf8');
    res.on('data', chunk => response += chunk);
    res.on('end', () => {
      response = accept === 'JSON' ? JSON.parse(response) : parser ? parser(response) : response;
      const status = { 
        name: `Status Code: ${res.statusCode} / Request URL: ${url}`
      , message: response
      , stack: res.headers
      };
      //log.trace(displayName, 'Status:', status);
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
          break; 
        case 500: case 501: case 502: case 503: case 504: case 505:
          callback(status);
          //setTimeout(() => 
          //  request({ url, method, header, search, auth, body, type, accept, parser, lang, operator }
          //    , callback), retry());
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
