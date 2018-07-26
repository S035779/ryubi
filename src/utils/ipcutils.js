import { ipcRenderer }  from 'electron';
import * as R           from 'ramda';
import { log }          from 'Utilities/webutils';

class ipc {
  constructor(props) {
    this.props = props;
  }

  set props(props) {
    this._props = props;
  }

  get props() {
    return this._props;
  }

  send(request, callback) {
    //ipcRenderer.setMaxListeners(0);
    ipcRenderer.on('asynchronous-reply', (event, response) => {
      if(response.error) return callback(response.error);
      this.setProps({ event });
      callback(null, response);
    });
    ipcRenderer.send('asynchronous-message', request);
  }

  sendSync(request) {
    //ipcRenderer.setMaxListeners(0);
    const response = ipcRenderer.sendSync('synchronous-message', request);
    if(response.error) return response.error;
    return response;
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
  }

  setProps(props) {
    this.props = Object.assign({}, this.props, props);
  }
};
ipc.displayName = 'ipc';

class fetch extends ipc {
  constructor(props) {
    super(props);
    this.state = { url: props.url, response: '' };
  }

  static of(props) {
    props = R.is(Object, props) ? props : { url: props };
    return new fetch(props);
  }

  get(request, callback) {
    const { url } = this.state;
    const { appid, token, operation, type, options, offset } = request;
    //log.info(fetch.displayName, 'Request', url, request);
    this.send({ url, method: 'GET', appid, token, operation, type, options, offset }, (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      //log.trace(fetch.displayName, 'response', response);
      callback(null, response);
    });
  }

  post(request, callback) {
    const { url } = this.state;
    const { appid, token, operation, type, options, items } = request;
    //log.info(fetch.displayName, 'Request', url, request);
    this.send({ url, method: 'POST', appid, token, operation, type, options, items }, (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      //log.trace(fetch.displayName, 'response', response);
      callback(null, response);
    });
  }

  _post(request) {
    const { url } = this.state;
    const { appid, token, operation, type, options, items } = request;
    //log.info(fetch.displayName, 'Request', url);
    const response = this.sendSync({ url, method: 'POST', appid, token, operation, type, options, items });
    this.setState({ response });
    //log.trace(fetch.displayName, 'response', response);
    return response;
  }
};
fetch.displayName = 'fetch';
export default { fetch };
