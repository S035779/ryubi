const { net } = require('electron');

exports.postXML = function (url, options, callback) {
  console.log(`URL: ${url}`);
  console.log('OPTION:', options);
  const request = net.request({ method: 'POST', url: url });
  request.on('response', response => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    let body = '';
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      callback(null, body);
    });
    response.on('error', err => {
      callback(err);
    });
  });
  request.end();
};
