/**
 * encodeFormData
 *
 * @param data {object}
 * @returns {string}
 */
const encodeFormData = function(data) {
  if (!data) return ""
  let pairs = [];
  for(let name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === "function") continue;
    let value = data[name].toString();
    name = encodeURIComponent(name.replace(" ", "+"));
    value = encodeURIComponent(value.replace(" ", "+"));
    pairs.push(name + "=" + value);
  }
  return pairs.join('&');
};

/**
 * JSONP.request
 *
 * @param url {string}
 * @param data {object}
 * @param callback {string}
 */
const JSONP = {
  index: 0,
  callbacks: {},
  request: function(url, data, callback) {
    let idx = '_' + JSONP.index++;
    let elm = document.createElement('script');
    elm.type = 'text/javascript';
    elm.charset = 'utf-8';
    elm.src = url + "?" + (data ? encodeFormData(data) + '&' : '') + 'callback=JSONP.callbacks.' + idx;
    JSONP.callbacks[idx] = function(res) {
      elm.parentNode.removeChild(elm);
      delete JSONP.callbacks[idx];
      callback(res);
    };
    document.getElementsByTagName('head')[0].appendChild(elm);
  }
};
