import std from 'Utilities/stdutils';

const log = {
  error: function(message) { console.error(message); }
, trace: function(message) { console.trace(message); }
, info:  function(message) { console.info(message);  }
, warn:  function(message) { console.warn(message);  }
};

const min = 2000;
const max = 5000;
const throttle = () => Math.floor(Math.random() * (max +1 - min) +min);

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
const fetch = function({ method, url, search, auth, head, body, type }, callback) {

  url = std.parse_url(url);
  let hostname  = url.hostname
    , port      = url.port
    , path      = url.pathname
    , query     = url.query
    , protocol  = url.protocol;

  if (query)  path += '?' + query;
  if (search) path += '?' + std.urlencode(search);
  if (body === null) body = '';

  if (body instanceof Buffer) {
    type = 'application/octet-stream';
  } else if (typeof body === 'string' && type === 'XML') {
    type = 'text/xml; charset=utf-8';
  } else if (typeof body === 'string') {
    type = 'text/plain; charset=utf-8';
  } else if (typeof body === 'object' && type === 'JSON') {
    body = JSON.stringify(body); 
    type = 'application/json';
  } else if (typeof body === 'object' && type === 'NV') {
    body = std.urlencode(body);  
    type = 'application/x-www-form-urlencoded';
  }
 
  const headers = Object.assign({}, head, {
    'Accept': 'application/json'
  , 'Accept-Charset': 'utf-8'
  , 'Accept-Language': 'ja-JP'
  , 'Content-Length': Buffer.byteLength(body)
  , 'Content-Type': type
  });

  if(auth && auth.hasOwnProperty('user') && auth.hasOwnProperty('pass')) {
    headers['Authorization'] = 'Basic ' + std.encode_base64(auth.user + ':' + auth.pass);
  } else if (auth && auth.hasOwnProperty('bearer')) {
    headers['Authorization'] =' Bearer ' + auth.bearer;
  }

  const client = protocol === 'http:' ? require('http') : require('https');
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
          log.error(`HTTP Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break; 
        case 200: case 201: case 202: case 204:
          process.stdout.write('-');
          callback(null, head, _body);
          break;
        case 301: case 302:
          log.error(`HTTP Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break; 
        case 400: case 401: case 402: case 403: case 404:
          log.error(`HTTP Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          return; 
        case 500: case 501: case 502: case 503: case 504: case 505:
          process.stdout.write('x');
          log.warn(`HTTP Request Failed. Status Code: ${stat} at ${hostname}`);
          setTimeout(() => fetch({ method, url, search, auth, head, body, type }, callback), throttle());
          break;
        default:
          process.stdout.write('?');
          log.warn(`HTTP Request Failed. Status Code: ${stat} at ${hostname}`);
          callback({ error: { name: stat, message: _body }});
          break;
      }
    });
  });
  req.on('error', function(err) {
    log.error(`Problem with HTTP Request: ${err.code}`);
    callback({ error: { name: err.code, message: err.message }});
  });
  req.write(body);
  req.end();
};
export default fetch;
