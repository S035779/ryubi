import http   from 'http';
import https  from 'https';
import std    from 'Utilities/stdutils';
import log    from 'Utilities/logutils';

const displayName = 'netutils';
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
    request(options, (err, head, body) => {
      if(err) return reject(err);
      resolve(body);
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
const request = function({ method, url, search, auth, head, body, type }, callback) {
  log.info(displayName, 'request', method, url);
  
  url = std.parse_url(url);
  let hostname  = url.hostname
    , port      = url.port
    , path      = url.pathname
    , query     = url.query
    , protocol  = url.protocol;
  
  if (query)  path += '?' + query;
  if (search) path += '?' + std.urlencode(search);

  //log.trace(displayName, 'Path', path);
  
  if (body instanceof Buffer) {
    type = 'application/octet-stream';
  } else if (typeof body === 'string' && type === 'XML') {
    type = 'text/xml; charset=utf-8';
  } else if (typeof body === 'string') {
    type = 'text/plain; charset=utf-8';
  } else if (typeof body === 'object' && type === 'JSON') {
    body = JSON.stringify(body); 
    type = 'application/json';
  } else if (typeof body === 'string' && type === 'NV') {
    body = std.urlencode(body);  
    type = 'application/x-www-form-urlencoded';
  } else if (type === 'NV') {
    body = '';
    type = 'application/x-www-form-urlencoded';
  } else {
    body = '';
    type = 'text/plain; charset=utf-8';
  }

  const headers = Object.assign({}, {
    'Accept': 'application/json'
  , 'Accept-Charset': 'utf-8'
  , 'Accept-Language': 'ja-JP'
  , 'Content-Length': body && body !== '' ? Buffer.byteLength(body) : 0
  , 'Content-Type': type
  }, head);
  
  //log.trace(displayName, 'Auth', auth);

  if (auth && auth.user && auth.pass) {
    headers['Authorization'] = 'Basic ' + std.encode_base64(auth.user + ':' + auth.pass);
  } else if (auth && auth.bearer) {
    headers['Authorization'] = 'Bearer ' + auth.bearer;
  }

  log.trace(displayName, 'headers', headers);
  //log.trace(displayName, 'Protocol', protocol);

  const client = protocol === 'http:' ? http : https;
  const req = client.request({
    hostname: hostname,
    port: port,
    path: path,
    method: method,
    headers: headers
  }, function(res) {
    const stat = res.statusCode;
    const head = res.headers;
    res.setEncoding('utf8');
    let _body = '';
    res.on('data', function(chunk) { _body += chunk; });
    res.on('end', function() {
      switch (stat) {
        case 101: case 102: case 103: case 104: case 105: case 106:
          log.error(displayName, `HTTP/HTTPS Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break; 
        case 200: case 201: case 202: case 204:
          process.stdout.write('-');
          callback(null, head, _body);
          break;
        case 301: case 302:
          log.error(displayName, `HTTP/HTTPS Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break; 
        case 400: case 401: case 402: case 403: case 404:
          log.error(displayName, `HTTP/HTTPS Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          return; 
        case 500: case 501: case 502: case 503: case 504: case 505:
          process.stdout.write('x');
          log.warn(displayName, `HTTP/HTTPS Request Failed. Status Code: ${stat} at ${hostname}`);
          setTimeout(() => fetch({ method, url, search, auth, head, body, type }, callback), throttle());
          break;
        default:
          process.stdout.write('?');
          log.warn(displayName, `HTTP/HTTPS Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break;
      }
    });
  });
  req.on('error', function(err) {
    log.error(displayName, `Problem with HTTP Request: ${err.code}`);
    callback({ error: { name: err.code, message: err.message }});
  });
  req.write(body);
  req.end();
};

export default { fetch, request };
